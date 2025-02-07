import { useState } from "react";
import axios from "axios"; // Для выполнения запросов на сервер
import "./Auth.module.scss"; // Здесь можно подключить кастомные стили

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }); // Хранит данные формы
  const [error, setError] = useState(""); // Для вывода ошибки
  const [success, setSuccess] = useState(""); // Для успешного сообщения

  // Отслеживаем изменения в полях ввода
  const handleChange = (e) => {
    setFormData({
      ...formData, // Логика обновления полей формы
      [e.target.name]: e.target.value,
    });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    try {
      // Выполняем POST-запрос на сервер (в ваш login.php)
      const response = await axios.post("http://localhost:40/login.php", {
        table: "users", // Таблица, с которой работает сервер
        action: "login", // Действие
        values: formData, // Данные формы для проверки входа
      });

      // Обработка ответа от сервера
      if (response.data.error) {
        setError(response.data.error); // Если ошибка, показываем её
        setSuccess("");
      } else {
        setError("");
        setSuccess("Успешный вход!"); // Сообщение об успехе

        console.log("Успешный ответ:", response.data);
      }
    } catch (err) {
      // Если сервер не отвечает или произошла ошибка
      console.error(err);
      setError("Ошибка сервера. Попробуйте позже.");
    }
  };

  return (
      <div className="login-container">
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="form-group">
            <label htmlFor="email">Эл. почта:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
          </div>

          <button type="submit">Войти</button>
        </form>
      </div>
  );
};

export default Login;