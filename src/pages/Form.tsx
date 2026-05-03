import React, { useState, FormEvent, ChangeEvent } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";


export function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    

    try {
        const user = await loginUser(email.trim(), password.trim());

        if (user) {
            localStorage.setItem('token', 'secret-key-123');
            navigate('/todo');
        } else {
            alert('вы не ввели свои данные');
        }
    } catch (error) {
        alert("ошибка сервера");
    }
};
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={handleEmailChange} 
                    required 
                />
            </div>
            <div>
                <label>Пароль:</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                    required
                />
            </div>
            <button type="submit">Войти</button>
        </form>
    );
}

export default LoginForm;