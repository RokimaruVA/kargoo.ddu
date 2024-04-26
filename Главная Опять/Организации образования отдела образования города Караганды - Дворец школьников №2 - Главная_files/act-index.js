(function($) {
    $(function() {
        $('.menu__icon').on('click', function() {   /* Функция для вызова менюшки в моб/версии далее смотреть CSS  #menu*/
            $(this).closest('.menu').toggleClass('menu_state_open');
        });            

        var elements = $('.menu ul').children();    /*указываем пункты меню содержащие еще ссылки */
        for (var i = 0; i < elements.length; i++){
            var li = elements[i];
            var ul = $(li).children('ul');
            if (ul.length>0){
                if(window.matchMedia('(max-width: 1100px)').matches){//метод проверки ширины окна
                    $(li).children('a').css('text-align','center');
                }
                $(li).children('a').append("<i class=\"fas fa-chevron-right\"></i>").toggleClass('menu_arrow_act');
            }
        }  
 });
})(jQuery);

$(function() {
    var lastWinY = 0;
    var $uoPageEl = $('.up-page');
    var $arrImg = $uoPageEl.find("img");
    var imgUp = '/media/img/site/sideUp.png';
    var imgDown = '/media/img/site/sideDown.png';

    $uoPageEl.click(function(){       
       //$('.up-page').css('display','none');  

       if($uoPageEl.hasClass("state-normal")) {
         $uoPageEl.addClass("in-animation");
         
         $('html, body').animate({scrollTop:0}, 'slow',function(){

            $uoPageEl.removeClass("state-normal");
            $uoPageEl.addClass("state-fallback");
            $arrImg.attr("src", imgDown);
            $uoPageEl.removeClass("in-animation"); 

         });
         lastWinY = window.scrollY;
       }else{
        
        $uoPageEl.addClass("in-animation");
        $('html, body').animate({scrollTop:lastWinY}, 'slow', function(){
            $uoPageEl.removeClass("state-fallback");
            $uoPageEl.addClass("state-normal"); 
            $arrImg.attr("src", imgUp);
            $uoPageEl.removeClass("in-animation");           
        });
       }
    })        
    
    if ($('#mobile').val()!='true') {
     window.onscroll = function() { 

        if($uoPageEl.hasClass("in-animation")) return;

        if (window.pageYOffset > 0) {            

            if($uoPageEl.hasClass("state-fallback")) {
                $uoPageEl.removeClass("state-fallback");
                $arrImg.attr("src", imgUp);
            }

            if($uoPageEl.hasClass("state-normal") == false)
                $uoPageEl.addClass("state-normal");

            $uoPageEl.css('display','inherit')        
        }    
        else {
            if($uoPageEl.hasClass("state-normal"))
                $uoPageEl.css('display','none');     
        }  
     } 
    } 
    else {
        //console.log('test');
        $('#right-block').after($('#left-block'));
    } 
}); 