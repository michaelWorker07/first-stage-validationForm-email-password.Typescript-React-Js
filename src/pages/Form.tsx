import React, { useState, FormEvent, ChangeEvent } from "react";
import { loginUser } from "../api/auth";
import "../components/styles/Form.css";
import "../components/styles/mobileopt.css"
import { useNavigate, Link } from "react-router-dom";


export function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showServerErrorModal, setShowServerErrorModal] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    const existingUsers = localStorage.getItem('users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    

    const user = users.find((u: any) => u.email === email.trim() && u.password === password.trim());
    
    console.log("Результат поиска:", user);
    
    if (user) {
        localStorage.setItem('token', 'secret-key-123');
        navigate('/todo');
    } else {
        setShowErrorModal(true);
        setTimeout(() => {
            setShowErrorModal(false);
        }, 4000);
    }
};
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <div className="formcontainer">

            {showErrorModal && (
                <div className="error-modal-form">
                    <div className="error-modal-content-form">
                        <h1>Ошибка входа</h1>
                        <h2>Вы ввели не свои данные</h2>
                    </div>
                </div>
            )}

            {showServerErrorModal && (
                <div className="error-modal-server">
                    <div className="error-modal-server-content">
                        <h1>Ошибка сервера</h1>
                        <h2>Сервер не запущен попробуйте позже...</h2>
                    </div>
                </div>
            )}
            
            <img className="iconFormImg" src="/materials/iconForm.png" alt="icon" />
        <form onSubmit={handleSubmit} className="formauthmain">
            <div>
                <input 
                    type="email" 
                    value={email} 
                    onChange={handleEmailChange}
                    placeholder="Ваш Email" 
                    required 
                />
            </div>
            <div>
                
                <input 
                    type="password"
                    value={password}
                    placeholder="Ваш пароль"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                    required
                />
            </div>
            <div className="checkboxremeberme">
                <input type="checkbox" id="remeberme"/>
                <label htmlFor="remeberme" className="labelRememberMe">Запомните меня</label>
                <em><Link to="/forgotpassworduser" className="forgotpasswordlink">Забыли пароль?</Link></em>
            </div>
                <div className="button-wrapper">
                    <button className="entrancebtn" type="submit">Войти</button>
                    
            </div>
        </form>
        <Link to="/createaccount" className="create-acc">← Еще нет аккаунта?</Link>
    </div>
    );
}

export default LoginForm;