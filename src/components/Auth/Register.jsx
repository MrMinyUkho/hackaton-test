import { useState } from "react";
import axios from "axios";

const Register = () => {
    // Состояния для хранения данных формы (поля регистрации).
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        phone: "",
        birth_year: "",
        role: "student", // По умолчанию "Ученик"
    });

    // Состояние для сообщения об успешной/неуспешной регистрации.
    const [responseMessage, setResponseMessage] = useState("");

    // Функция обработки изменений в полях формы.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Функция обработки отправки формы.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Предотвращает перезагрузку страницы по умолчанию.

        try {
            // Формируем запрос на сервер с action "register".
            const response = await axios.post("http://localhost:40/projectJS/login.php", {
                ...formData,
                action: "register", // Указываем действие "register".
            });

            // Устанавливаем сообщение из ответа сервера.
            setResponseMessage(response.data.message);

            // Если успешная регистрация, очищаем форму.
            if (response.data.success) {
                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                    phone: "",
                    birth_year: "",
                    role: "student",
                });
            }
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            setResponseMessage("Ошибка соединения с сервером. Попробуйте снова.");
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                {/* Поле ввода имени */}
                <label>
                    Имя:
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                {/* Поле ввода фамилии */}
                <label>
                    Фамилия:
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                {/* Поле ввода электронной почты */}
                <label>
                    Эл. почта:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                {/* Поле ввода пароля */}
                <label>
                    Пароль:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                {/* Поле подтверждения пароля */}
                <label>
                    Подтверждение пароля:
                    <input
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                {/* Поле ввода номера телефона */}
                <label>
                    Номер телефона:
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </label>
                <br />

                {/* Поле ввода года рождения */}
                <label>
                    Год рождения:
                    <input
                        type="number"
                        name="birth_year"
                        value={formData.birth_year}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                {/* Выбор роли пользователя */}
                <label>
                    Выберите роль:
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="student">Ученик</option>
                        <option value="teacher">Учитель</option>
                    </select>
                </label>
                <br />

                <button type="submit">Зарегистрироваться</button>
            </form>

            {/* Отображение сообщения об успешной/неуспешной регистрации */}
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default Register;