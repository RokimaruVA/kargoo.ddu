$(document).ready(function(){
    var flag = false;
    $(".menu-btn").click(function() {
        if (!flag) {
            // $(".content-view .column .menu").css( "transform", "translateX(0%)" );
            $(".content-view .column .menu").addClass('trans');
            $(".stick1").css("animation-name","sticky1");
            $(".stick2").css("animation-name","sticky2");
            $(".stick3").css("animation-name","sticky3");
            $(".stick1").toggleClass('exit');
            $(".stick2").toggleClass('exit');
            $(".stick3").toggleClass('exit');
            flag = true;
        } else {
            // $(".content-view .column .menu").css( "transform", "translateX(-70%)" );
            $(".content-view .column .menu").removeClass('trans');
            $(".stick1.exit").css("animation-name","sticky1exit");
            $(".stick2.exit").css("animation-name","sticky2exit");
            $(".stick3.exit").css("animation-name","sticky3exit");
            $(".stick1").removeClass('exit');
            $(".stick2").removeClass('exit');
            $(".stick3").removeClass('exit');
            flag = false;
        }
    });    

    var elements = $('.menu-block .top-menu').children('li');//указываем пункты меню содержащие еще ссылки 
    for (var i = 0; i < elements.length; i++){
        if (elements.length-1==i || elements.length-2==i){
            var ul = elements[i];
            $(ul).addClass('last-ul');
        }
    }
    var elements = $('.top-menu').children('li');//указываем пункты меню содержащие еще ссылки 
    for (var i = 0; i < elements.length; i++){
        if (elements.length-1==i || elements.length-2==i){
            var ul = elements[i];
            $(ul).addClass('last-ul');
        }

    }

    $('.ptMenuV').click(function(e){
       if(e.target.tagName == 'LI' || e.target.tagName == 'A') {
           const ul = e.target.nextElementSibling;
           ul.classList.toggle('act')
       }
    });




});

