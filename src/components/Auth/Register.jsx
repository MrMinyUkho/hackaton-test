import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password_hash: '',
        phone_number: '',
        birth_year: '',
        role: 'student', // По умолчанию "student"
        avatar_url: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/users', formData);
            setMessage(response.data.message);
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                password_hash: '',
                phone_number: '',
                birth_year: '',
                role: 'student',
                avatar_url: '',
            }); // Сбрасываем форму после успешного завершения.
        } catch (err) {
            console.error('Ошибка при регистрации:', err);
            // Устанавливаем сообщение об ошибке:
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error); // Если сервер вернул ошибку
            } else {
                setError('Произошла ошибка при отправке запроса.');
            }
        }
    };

    return (
        <div>
            <h2>Регистрация пользователя</h2>
            <form onSubmit={handleSubmit}>
                {/* Поля ввода */}
                <input
                    name="first_name"
                    placeholder="Имя"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="last_name"
                    placeholder="Фамилия"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password_hash"
                    placeholder="Пароль"
                    value={formData.password_hash}
                    onChange={handleChange}
                    required
                />
                <input
                    name="phone_number"
                    placeholder="Телефон (необязательно)"
                    value={formData.phone_number}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="birth_year"
                    placeholder="Год рождения"
                    value={formData.birth_year}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="student">Студент</option>
                    <option value="teacher">Учитель</option>
                </select>
                <input
                    name="avatar_url"
                    placeholder="URL аватарки (необязательно)"
                    value={formData.avatar_url}
                    onChange={handleChange}
                />
                <button type="submit">Зарегистрироваться</button>
            </form>

            {/* Сообщения */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;