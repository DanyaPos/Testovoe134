import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';  // Главная страница
import LoginPage from './LoginPage';  // Страница логина

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginPage />} /> {/* Страница логина */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
