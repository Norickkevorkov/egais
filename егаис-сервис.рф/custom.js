;$(document).ready(function(){
    function success(){
        $('#main_form').find('i').html('Ваши данные успешно отправлены!<br> С Вами свяжутся наши специалисты в течении 15 минут').css('color','green');
        setTimeout(function () {
            $('#main_form').find('i').html('Ваши данные не будут переданы 3-им лицам').css('color','#000');
        }, 3000);
        yaCounter33962214.reachGoal('consutation');
    }
    function error(){
        $('#main_form').find('i').html('Не удалось отправить данные, пожалуйста проверьте правильность заполнения полей.').css('color','red');
        setTimeout(function () {
            $('#main_form').find('i').html('Ваши данные не будут переданы 3-им лицам').css('color','#000');
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
        console.log(42);
        $('#footer_form').find('p').html('Ваши данные успешно отправлены!<br> С Вами свяжутся наши специалисты в течении 15 минут').css('color','green');
        setTimeout(function () {
            $('#footer_form').find('p').html('Мы свяжемся с Вами в течение 15 минут').css('color','#fff');
        }, 3000);
        yaCounter33962214.reachGoal('consultation_down');
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