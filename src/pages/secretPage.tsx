import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/styles/secretPage.css';

export function SecretPage() {
    const [OpenModalMessage, setOpenModalMessage] = useState(false);
    const [email, setEmail] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
   

    const openModal = () => {
        if(!email.trim()) {
           setShowErrorModal(true);
           setTimeout(() => {
            setShowErrorModal(false);
           }, 4000);
            return;
        }
        
        setOpenModalMessage(true);
        setEmail(''); 
    };
      
    const closeModal = () => setOpenModalMessage(false);

    
    return (
        <div className="secret-container">
            <div className="secret-card">
                <img className='forgotpasswordimg' src="/materials/iconForm.png" alt="icon" />
                <h1>🔐 Забыли пароль?</h1>
                <p>Введите ваш email, и мы отправим инструкцию по восстановлению</p>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    openModal();
                }}>
                
                <input 
                    type="email" 
                    placeholder="Ваш email"
                    className="secret-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {showErrorModal && (
                    <div className='error-modal'>
                        <div className='error-modal-content'>
                            <h1>❌ Введите ваш Email!</h1>
                        </div>
                    </div>
                )}
                
                <button 
                type="submit"
                onClick={openModal} 
                className="secret-btn">Отправить</button>
                </form>
                {OpenModalMessage && (
                    <div className='modal-overlay'>
                        <div className='modalacceptmessage'>
                            <h1>Ваш запрос принят! Ожидайте инструкцию на почту!</h1>
                            <button onClick={closeModal}
                            className='btnokaymessage'
                            >Хорошо</button>
                        </div>
                    </div>
                )}
                
                
                <Link to="/" className="back-link">→ Вернуться на главную</Link>
            </div>
        </div>
    );
}

export default SecretPage;