<?php
// Настройки подключения к MySQL через Laragon
$host = 'localhost';
$dbname = 'hackaton_test'; // Имя вашей базы данных (замените, если нужно)
$user = 'root'; // Логин root по умолчанию
$pass = 'root'; // Пароль. Если вы устанавливали, вставьте его, иначе оставьте пустым.

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Ошибка подключения: " . $e->getMessage());
}
?>