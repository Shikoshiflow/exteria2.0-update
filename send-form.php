// Устанавливаем заголовки для получения данных с формы
header('Content-Type: application/json');

// Проверяем метод запроса
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = isset($_POST['user_name']) ? htmlspecialchars($_POST['user_name']) : '';
    $company = isset($_POST['user_company']) ? htmlspecialchars($_POST['user_company']) : '';
    $email = isset($_POST['user_email']) ? htmlspecialchars($_POST['user_email']) : '';
    $phone = isset($_POST['user_phone']) ? htmlspecialchars($_POST['user_phone']) : '';
    $service = isset($_POST['user_service']) ? htmlspecialchars($_POST['user_service']) : '';
    $message = isset($_POST['user_message']) ? htmlspecialchars($_POST['user_message']) : '';
    
    // Переменные для настройки электронной почты
    $to = "Mansur.malsagov@exteriatrade.com"; // Ваш email
    $subject = "Новая заявка с сайта ИмпортПро от $name";
    
    // Формируем тело письма
    $email_message = "Поступила новая заявка с сайта ИмпортПро\n\n";
    $email_message .= "Имя: $name\n";
    $email_message .= "Компания: $company\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Телефон: $phone\n";
    $email_message .= "Интересующая услуга: $service\n\n";
    $email_message .= "Сообщение:\n$message\n";
    
    // Дополнительные заголовки
    $headers = "From: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n"; 
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Отправляем письмо
    $mail_sent = mail($to, $subject, $email_message, $headers);
    
    // Возвращаем результат в формате JSON
    if ($mail_sent) {
        echo json_encode([
            "status" => "success",
            "message" => "Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время."
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами другим способом."
        ]);
    }
    
    exit;
} else {
    // Если это не POST запрос, возвращаем ошибку
    echo json_encode([
        "status" => "error",
        "message" => "Неверный метод запроса."
    ]);
    exit;
}