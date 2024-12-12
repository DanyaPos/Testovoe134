import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./Register";
import AuthorizedPage from "./AuthorizedPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/account" element={<AuthorizedPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
};

export default App;
