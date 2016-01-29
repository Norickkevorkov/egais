;$(document).ready(function () {
    var mobileMenuShown = false;
    function showLogo(){
        var $menu = $(".top_menu");

        if($menu.hasClass('default')){
            $('.menu_logo').hide();
        }else{
            $('.menu_logo').show();
        }
    }
    showLogo();
    var $menu = $(".top_menu");
    $(window).scroll(function(){
        if($(window).width()>992){
            if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
                $menu.removeClass("default").addClass("fixed");
            } else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
                $menu.removeClass("fixed").addClass("default");
            }
        }
        showLogo();
    });//scroll
    var lastId,
        topMenu = $(".top_menu"),
        topMenuHeight = topMenu.outerHeight()+15,
    // All list items
        menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });
    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = $(this).scrollTop()+topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=#"+id+"]").parent().addClass("active");
        }
    });
    $(".top_menu").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),

        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        if($(this).attr('href')=='#aboutEGAIS'){
            top = top-90;
        }
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });

    $('#rest .tab a').click(function(e){e.preventDefault()});
    $('#wholesale .tab a').click(function(e){e.preventDefault()});
    if($(window).width()<=768){
        $('#wholesale .tab a').text('1С: УТАП');
        $('.pricecard_header .to_standart a').text('ДАЛИОН');
    }
    $('.menu_list_button').click(function () {
        $('.opened_menu').toggle();
    });
    $('.top_menu').click(function () {
        if($(window).width()<=992){
            $('.top_menu_opened').toggle();
        }
    });
    $('.top_menu_opened a').click(function () {
        if($(window).width()<=992){
            $('.top_menu_opened').hide();
        }
    });
    $('.opened_menu a').click(function () {
        $('.opened_menu').hide();
    });
    $('#retail .tab a').click(function (e) {
        e.preventDefault();
        var link = $(this).attr('href');
        var parent = $(this).parents('.pricecard_header');
        parent.find('.tab').removeClass('active');
        parent.find('.list_bg').removeClass('active not_active near_active');
        parent.parent().find('.pricecard').removeClass('active');
        console.log(parent);
        if(link == 'to_standart'){
            parent.find('.to_standart').addClass('active');
            parent.parent().find('.standart').addClass('active');
            parent.find('.list_bg:first').addClass('active');
            parent.find('.list_bg:last').addClass('near_active');
        }else if(link == 'to_econom'){
            parent.find('.to_econom').addClass('active');
            parent.parent().find('.econom').addClass('active');
            parent.find('.list_bg:first').addClass('near_active');
            parent.find('.list_bg:last').addClass('not_active');
        }else if(link == 'to_shtrih'){
            parent.find('.to_shtrih').addClass('active');
            parent.parent().find('.shtrih').addClass('active');
            parent.find('.list_bg:first').addClass('not_active');
            parent.find('.list_bg:last').addClass('active');
        }
    });
    $('.fancybox').fancybox();
    function success(){
        $('#main_form').find('b').html('Ваши данные успешно отправлены!<br> С Вами свяжутся наши специалисты в течении 15 минут').css('color','green');
        setTimeout(function () {
            $('#main_form').find('b').html('Ваши данные не будут переданы 3-им лицам').css('color','#000');
        }, 3000);
        $('#main_form input').val('');
        yaCounter34269565.reachGoal('consutation');
    }
    function error(){
        $('#main_form').find('b').html('Не удалось отправить данные, пожалуйста проверьте правильность заполнения полей.').css('color','red');
        setTimeout(function () {
            $('#main_form').find('b').html('Ваши данные не будут переданы 3-им лицам').css('color','#000');
        }, 3000);
    }
    $('#main_form input[name="phone"]').inputmask("+7(999)999-99-99");
    $('#footer_form input[name="phone"]').inputmask("+7(999)999-99-99");
    $('#main_form button[type="submit"]').click(function () {
        var isErrors = false;
        if(($('#main_form input[name="name"]').val()=="Имя")||($('#main_form input[name="name"]').val()=='')){
            isErrors = true;
        }
        if($('#main_form input[name="phone"]').val().indexOf('_')!= -1){
            isErrors = true;
        }
        if(isErrors == false){
            $(function() {
                $('#main_form ').submit(function (e) {
                    e.preventDefault();
                    var data = $('#main_form').serializeArray();
                    $.ajax({
                        type: "POST",
                        url: 'mail.php',
                        data: data,
                        error: error(),
                        success: success()
                    });
                });
            });

        }else{
            error();
        }
    });
    function error_on_footer(){

        $('#footer_form').find('p').html('Не удалось отправить данные, пожалуйста проверьте правильность заполнения полей.').css('color','red');
        setTimeout(function () {
            $('#footer_form').find('p').html('Мы свяжемся с Вами в течение 15 минут').css('color','#fff');
        }, 3000);
    }
    function success_on_footer(){
        $('#footer_form').find('p').html('Ваши данные успешно отправлены!<br> С Вами свяжутся наши специалисты в течении 15 минут').css('color','green');
        setTimeout(function () {
            $('#footer_form').find('p').html('Мы свяжемся с Вами в течение 15 минут').css('color','#fff');
        }, 3000);
        $('#footer_form input').val('');
        yaCounter34269565.reachGoal('consultation_down');
    }
    $('#footer_form button[type="submit"]').click(function () {
        var isErrors = false;
        if(($('#footer_form textarea').val()=="Задайте вопрос")||($('#footer_form textarea').val()=='')){
            isErrors = true;
        }
        if($('#main_form input[name="phone"]').val().indexOf('_')!= -1){
            isErrors = true;
        }
        if(isErrors == false){
            $(function() {
                $('#footer_form ').submit(function (e) {
                    e.preventDefault();
                    var data = $('#footer_form').serializeArray();
                    $.ajax({
                        type: "POST",
                        url: 'ask_question.php',
                        data: data,
                        error: error_on_footer(),
                        success: success_on_footer()
                    });
                });
            });
        }else{
            error_on_footer();
        }
    });
});
$(window).load(function () {
    if($(window).width()<1500){
        $('.equip_item .img_border').css({
            'float':'none'
        });
    }else{
        $('.equip_item .img_border').css({
            'float':'right'
        });
    }
});
$(window).resize(function () {
    if($(window).width()<1500){
        $('.equip_item .img_border').css({
            'float':'none'
        });
    }else{
        $('.equip_item .img_border').css({
            'float':'right'
        });
    }
});