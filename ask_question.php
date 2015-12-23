<?php
$isErrors = false;
$question = $_POST['question'];
$phone = $_POST['phone'];
if((htmlspecialchars(strip_tags(stripslashes(trim($question))))=='')||(htmlspecialchars(strip_tags(stripslashes(trim($phone))))=='')){
    $isErrors = true;
};
if($isErrors==false){
    $to  = "<info@b-ts.ru>" ;

    $subject = "Вопрос по ЕГАИС";

    $message = 'Номер телефона: <p>'.$phone.'</p><br><p>'.$question.'</p>';
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'From: Вопрос по ЕГАИС с сайта http://xn----7sbhbjdtd4ehbe.xn--p1ai/'. "\r\n";
    $headers .= "Subject: {$subject}". "\r\n";

    mail($to, $subject, $message, $headers);
}
?>