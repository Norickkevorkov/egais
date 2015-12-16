;$(document).ready(function(){
    function success(){
        $('#main_form').find('i').html('Ваши данные успешно отправлены!').css('color','green');
        setTimeout(function () {
            $('#main_form').find('i').html('Ваши данные не будут переданы 3-им лицам').css('color','#605E5E');
        }, 3000);
    }
    function error(){
        $('#main_form').find('i').html('Не удалось отправить данные, пожалуйста проверьте правильность заполнения полей.').css('color','red');
        setTimeout(function () {
            $('#main_form').find('i').html('Ваши данные не будут переданы 3-им лицам').css('color','#605E5E');
        }, 3000);
    }
    $('#main_form input[name="phone"]').inputmask("+7(999)999-99-99");
    $('#main_form input[type="submit"]').click(function () {
        var isErrors = false;
        if(($('#main_form input[name="name"]').val()=="Введите имя")||($('#main_form input[name="name"]').val()=='')){
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
    $('a[href*=#]').bind("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
        e.preventDefault();
    });


});