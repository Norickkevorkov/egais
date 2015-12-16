<?php
$isErrors = false;
$name = $_POST['name'];
$phone = $_POST['phone'];
if((htmlspecialchars(strip_tags(stripslashes(trim($name))))=='')||(htmlspecialchars(strip_tags(stripslashes(trim($phone))))=='')){
    $isErrors = true;
};
if($isErrors==false){
    $to  = "<info@b-ts.ru>" ;

    $subject = "Заявка ЕГАИС";

    $message = ' <p>Имя клиента: '.$name.'</p> </br> Номер телефона: <p>'.$phone.'</p>';
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'From: Заявка на ЕГАИС с сайта http://xn----7sbbjjuqh2az.xn--p1ai/'. "\r\n";
    $headers .= "Subject: {$subject}". "\r\n";

    mail($to, $subject, $message, $headers);
}
?>