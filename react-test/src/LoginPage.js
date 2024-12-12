import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/login", {
                email,
                password,
            });

            navigate("/account");
        } catch (err) {
            setError("Неверный логин или пароль");
        }
    };

    return (
        <div className="form-container">
            <h2>Вход</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Войти
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default LoginPage;
