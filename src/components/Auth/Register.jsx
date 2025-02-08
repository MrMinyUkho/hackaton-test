import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    // Создаём состояние для данных формы
    const [formDataState, setFormDataState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
        birth_year: '',
        role: 'student', // значение по умолчанию
    });

    const [responseMessage, setResponseMessage] = useState('');

    // Функция для обработки изменений в полях ввода
    const handleChange = (e) => {
        const { name, value } = e.target; // Деструктурируем name и value из input
        setFormDataState((prevState) => ({
            ...prevState,
            [name]: value, // Обновляем только нужное поле
        }));
    };

    // Функция для обработки отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault(); // Отменяем стандартное поведение формы

        try {
            // Создаём FormData и передаём значения из formDataState
            const formData = new FormData();
            Object.entries({
                ...formDataState, // Используем состояние формы
                action: 'register', // Добавляем action
            }).forEach(([key, value]) => formData.append(key, value));

            console.log('Отправляемые данные:', Object.fromEntries(formData.entries()));

            const response = await axios.post(
                'http://localhost:40/projectJS/login.php', // Адрес вашего API
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Ответ сервера:', response.data);
            setResponseMessage(response.data.message); // Показываем сообщение от сервера
        } catch (error) {
            console.error('Ошибка запроса:', error?.response?.data || error.message);
            setResponseMessage('Ошибка соединения с сервером. Попробуйте снова.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Имя:
                <input
                    type="text"
                    name="first_name"
                    value={formDataState.first_name}
                    onChange={handleChange} // Обновляем состояние при изменении
                />
            </label>
            <label>
                Фамилия:
                <input
                    type="text"
                    name="last_name"
                    value={formDataState.last_name}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formDataState.email}
                    onChange={handleChange}
                />
            </label>
            <label>
                Пароль:
                <input
                    type="password"
                    name="password"
                    value={formDataState.password}
                    onChange={handleChange}
                />
            </label>
            <label>
                Подтверждение пароля:
                <input
                    type="password"
                    name="confirm_password"
                    value={formDataState.confirm_password}
                    onChange={handleChange}
                />
            </label>
            <label>
                Телефон:
                <input
                    type="text"
                    name="phone"
                    value={formDataState.phone}
                    onChange={handleChange}
                />
            </label>
            <label>
                Год рождения:
                <input
                    type="text"
                    name="birth_year"
                    value={formDataState.birth_year}
                    onChange={handleChange}
                />
            </label>
            <label>
                Роль:
                <select name="role" value={formDataState.role} onChange={handleChange}>
                    <option value="student">Студент</option>
                    <option value="teacher">Учитель</option>
                </select>
            </label>
            <button type="submit">Зарегистрироваться</button>
            {responseMessage && <p>{responseMessage}</p>}
        </form>
    );
};

export default Register;