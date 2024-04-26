DG = window.DG || {};
DG.WebApi = DG.WebApi || {};

DG.apitracker = DG.WebApi.Tracker = (function() {
    /**
     * ID тега <script>
     * @type {string}
     */
    var scriptId = '_bcri_script';
    /**
     * Очередь запросов к серверу статистики
     * @type {Array}
     */
    var requestsQueue = [];
    /**
     * Статус очереди
     * @type {boolean}
     */
    var requestsLoading = false;

    var config = {
        statsHost: 'http://stat.api.2gis.ru',
        statsRequestVersion: '2.0'
    };

    /**
     * Регистрация любого типа статистики
     * jsonData должен содержать:
     *  поле type - типа статистики
     *  url только для bc статистики,
     *  опционально поле fields с кастомными полями для урла
     *
     * @param jsonData
     */
    function regUrl(jsonData) {
        var url = config.statsHost + '?v=' + config.statsRequestVersion;
        if (typeof jsonData !== 'object') {
            return;
        }

        if (jsonData.type === 'bc' && jsonData.url) {
            url = jsonData.url;
        }
        if (typeof jsonData.fields === 'object') {
            url = addFields(url, jsonData.fields);
        }

        addUrl(url);
    }


    /**
     * Регистрация Business connection
     * @param url
     * @param place
     */
    function regBC(url, place) {
        if (place !== undefined) {
            url += '&place=' + place;
        }

        addUrl(url);
    }

    /**
     * Register additional bussines connection
     * @param {String} url
     * @param {String} event
     */

    function regBCEvent(url, event) {
        if (event !== undefined) {
            url += '&event_type=' + event;
        }
        this.regBC(url);
    }

    /**
     * Добавление кастомных полей для урла
     * @param url
     * @param fields
     * @returns string
     */
    function addFields(url, fields) {
        for (var field in fields) {
            if (fields.hasOwnProperty(field)) {
                url += '&' + field + '=' + fields[field];
            }
        }
        return url;
    }


    /**
     * Регистрация показа
     * @param hash
     * @param place
     * @param branchId
     */
    function regImpression(hash, place, branchId) {
        var url = config.statsHost + '?v=' + config.statsRequestVersion + '&hash=' + hash;
        if (place !== undefined) {
            url += '&place=' + place;
        }

        if (branchId !== undefined) {
            url += '&branch_id=' + branchId;
        }

        url += '&action=reg_impression';
        addUrl(url);
    }

    /**
     * Регистрация показа для POI
     * @param branchId
     * @param apiKey
     */
    function regPOIImpression(branchId, apiKey) {
        var url = config.statsHost + '?v=' + config.statsRequestVersion + '&poi_id=' + branchId + '&api_key=' + apiKey;

        addUrl(url);
    }

    function isBot() {
        var isUser = window.screen && screen.width && screen.width > 10;
        return !isUser;
    }

    /**
     * Добавить урл в очередь на отправку
     * @param url
     */
    function addUrl(url) {
        if (isBot()) {
            return;
        }

        if (window.location.protocol == "https:") {
            url = url.replace(/^http:/, 'https:');
        }

        requestsQueue.push(url);
        startRequestsLoading();
    }

    /**
     * Инициировать отправку сообщений из очереди
     */
    function startRequestsLoading() {
        if (requestsLoading) {
            return;
        }

        requestsLoading = true;
        callNextUrl();
    }

    /**
     * Взять очередной урл и вызвать его
     */
    function callNextUrl() {
        var url = requestsQueue.shift();
        if (!url) {
            requestsLoading = false;
            return;
        }

        var ds = document.createElement('script');
        ds.async = true;
        ds.id = scriptId;
        ds.src = url;
        ds.onerror = ds.onload = onCallComplete;
        document.body.appendChild(ds);
    }

    /**
     * Обработка завершения вызова урла
     */
    function onCallComplete() {
        var el = document.getElementById(scriptId);
        if (el && el.parentNode) {
            el.onerror = el.onload = null;
            el.parentNode.removeChild(el);
        }

        setTimeout(callNextUrl, 0); // next tick
    }

    // Public interface
    return {
        regBC: regBC,
        regBCEvent: regBCEvent,
        regUrl: regUrl,
        regImpression: regImpression,
        regPOIImpression: regPOIImpression
    };
})();
