<?php 

$c = true;

$incoming = file_get_contents('php://input');

$mailForm = json_decode($incoming);

// Save Basic Form parametrs
$project_name = "Мой сайт портфолио";
$admin_email  = "ko4erov@mail.ru";
$form_subject = "Сообщение с сайта cosmo-portfolio";
$form_from = "admin@michael.qlihost.ru";

$message = "";

foreach ( $mailForm as $key => $value ) {
	if ( $value != "" ) {
		$message .= "
		" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
		<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
		<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
	</tr>
	";
	}
}

// Create message text for sending on email
$message = "<table style='width: 100%;'>$message</table>";

// Adjusting text encoding
function adopt($text) {
	return '=?UTF-8?B?'.base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$form_from.'>' . PHP_EOL .
'Reply-To: '.$form_from.'' . PHP_EOL;

// Sending email to admin
mail($admin_email, adopt($form_subject), $message, $headers );

echo "success";


?>