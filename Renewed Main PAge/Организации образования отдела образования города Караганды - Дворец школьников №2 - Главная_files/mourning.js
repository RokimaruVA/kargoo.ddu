var text_ru = "«29 октября 2023 года - День общенационального траура в Республике Казахстан»";
var text_kz = '2023 жылғы 29 қазан Қазақстан Республикасындағы Жалпыұлттық аза тұту күні';
var text_en = '2023 жылғы 12 маусым Қазақстан Республикасындағы Жалпыұлттық аза тұту күні';

var link_ru = 'https://www.akorda.kz/ru/glava-gosudarstva-vyrazil-soboleznovaniya-semyam-pogibshih-shahterov-2895622';
var link_kz = 'https://www.akorda.kz/kz/memleket-basshysy-kaza-tapkan-kenshilerdin-otbasylaryna-konil-aytty-2895717';
var link_en = 'https://www.akorda.kz/kz/memleket-basshysy-kaza-tapkan-kenshilerdin-otbasylaryna-konil-aytty-2895717';

var dateTimeStart = new Date("2023-10-28T23:00:01");
var dateTimeEnd = new Date("2023-10-30T00:00:00");
var curDateTime = new Date();

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}

function Mourning(text) {
    var body = document.getElementsByTagName("body")[0];
        body.style.filter = "grayscale(1)";
        body.style.background = "none";

    $("body").append("<div class='mourning'><div class='text'>"+text+"</div></div>");
    $(".ui-tabs").each(function(){$(this).tabs("rotate",0)});
    $("object").css("display","none");
    $('.jcarousel-container, .jcarousel-list').each(
        function() {
            var obj = $(this).data('jcarousel'); 
            if (obj) {
                obj.stopAuto(); 
                obj.clip.unbind('mouseenter mouseleave');
                obj.options.auto=0;
            }
        }
    );

    $('.carousel .carousel-wrap ul').each(function() {
        $(this).clone().show().css('position', 'static').appendTo('.carousel .carousel-wrap');
        $(this).remove();        
    });        

    $('.carousel .carousel-pagination').remove();
    $('.nivoSlider').each(function() { $(this).data('nivoslider').stop() });
    //$(".widget .dictionary").parents('.widget').hide();

    //$(".dictionary").parent().parent().css("margin-top","50px");
}

document.addEventListener("DOMContentLoaded", function(event) { 
    if (dateTimeStart < curDateTime && curDateTime < dateTimeEnd) {
        console.log("Активирован модуль траур");
        lang = getCookie("lang");
        if (lang != null) lang = lang.substr(lang.length - 2,2);
        if ((lang == "ru") || (lang == null)) Mourning("<a href="+link_ru+">"+text_ru+"</a>");
        if (lang == "kz") Mourning("<a href="+link_kz+">"+text_kz+"</a>");
        if (lang == "en") Mourning("<a href="+link_en+">"+text_en+"</a>"); 

        $(".mourning").css({
            "height":"50px",    
            "width": "100%",
            "background": "black",
            "color": "white",
            "position": "fixed",
            "top": "0",
            "display": "block",
            "z-index": "1000000",
        	"text-align": "center",
        });
        
        $(".mourning .text").css({
            "width": "900px",
            "margin": "0 auto",
            "padding": "15px 50px",
            "background-image": "url('https://goo.kz/media/img/site/gov/menu_icons/lenta.png') ",
            "background-size": "contain",
            "background-repeat": "repeat-y"
        })

        $(".mourning a").css({
            "color": "white"    
        })

        $("html").css("filter","grayscale(1)");
        $("html").css("-webkit-filter","grayscale(1)");
        $("body").css("padding-top", "45px");
        $("body").css("background", "none"); 
        $("html").css("background", "none");

        $(".top-navbar-holder").css({
            "padding-top": "50px",
        })
        $(".content-wrapper").css({
            "padding-top": "45px",
        })

    }

    window.is_traur = 1;
});
