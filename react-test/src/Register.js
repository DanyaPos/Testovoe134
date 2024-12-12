import React, { useState } from 'react';
import axios from './axios';
import './App.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка паролей
        if (password !== password_confirmation) {
            setError('Пароли не совпадают!');
            return;
        }

        // Проверка на символы
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(password)) {
            setError('Пароль должен содержать символы в разных регистрах и цифры.');
            return;
        }

        try {
            // Отправляем данные на сервер
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password,
                password_confirmation
            });

            console.log('User registered:', response.data);

            // Регистрация
            setMessage('Регистрация прошла успешно!');
            setError(null);
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Ошибка регистрации');
            } else {
                setError('Сервер недоступен');
            }
            setMessage(null);
        }
    };

    return (
        <div className="form-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Имя</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Электронная почта</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Подтверждение пароля</label>
                    <input
                        type="password"
                        value={password_confirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        className="input-field"
                    />
                </div>
                {error && <div className="error-message">{error}</div>}  {/* Показываем ошибки */}
                {message && <div className="success-message">{message}</div>}  {/* Показываем сообщение об успешной регистрации */}
                <button type="submit" className="submit-btn">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;
