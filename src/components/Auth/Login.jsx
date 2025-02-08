import { useState } from 'react';
import axios from 'axios';
import "./Auth.module.scss"
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const response = await axios.post('http://localhost:5000/api/login', formData);
      setMessage(`Добро пожаловать, ${response.data.first_name}!`);
      localStorage.setItem('token', response.data.token); // Сохранение токена в localStorage
    } catch (err) {
      console.error('Ошибка при входе:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Ошибка при попытке входа.');
      }
    }
  };

  return (
      <div>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
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
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              required
          />
          <button type="submit">Войти</button>
        </form>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  );
};

export default Login;
