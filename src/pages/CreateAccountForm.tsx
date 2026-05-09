import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/styles/CreateAccountForm.css';
import { UserData, CurrentUser } from '../types/types';

export function CreateAccountForm() {
    const navigate = useNavigate();

    const [dataInputEmail, setDataInputEmail] = useState<string>('');
    const [dataInputPassword, setDataInputPassword] = useState<string>('');

    const [showErrorModalEmail, setShowErrorModalEmail] = useState<boolean>(false);
    const [showErrorModalPassword, setShowErrorModalPassword] = useState<boolean>(false);
    const [showErrorModalEmpty, setShowErrorModalEmpty] = useState<boolean>(false);
    const [showUserAlreadyExistsModal, setShowUserAlreadyExistsModal] = useState<boolean>(false);
    
    const [openRequestAcceptedModal, setOpenRequestAcceptedModal] = useState<boolean>(false);

    const closeModalDataAccount = () => setOpenRequestAcceptedModal(false);
    
    const saveUser = () => {
        

        const existingUsers = localStorage.getItem('users');
        const users = existingUsers ? JSON.parse(existingUsers) : [];
        const userExists = users.some((user: any) => user.email === dataInputEmail);

        if (userExists) {
            setShowUserAlreadyExistsModal(true);
            setTimeout(() => setShowUserAlreadyExistsModal(false), 4000);
            return false;
        }

        users.push({
            email: dataInputEmail,
            password: dataInputPassword
        });

        localStorage.setItem('users', JSON.stringify(users));

        console.log("Пользователь сохранен", users);
        return true;


    }

    const openModalData = () => {

        const userSaved = saveUser();
        if (!userSaved) return;

        if (!dataInputEmail.trim() && !dataInputPassword.trim()) {
            setShowErrorModalEmpty(true);
            setTimeout(() => setShowErrorModalEmpty(false), 4000);
            return;
        }

        if (!dataInputEmail.trim()) {
           setShowErrorModalEmail(true);
           setTimeout(() =>  setShowErrorModalEmail(false), 4000);
           return;
        }

        if (!dataInputPassword.trim()) {
            setShowErrorModalPassword(true);
            setTimeout(() => 
            setShowErrorModalPassword(false), 4000);
            return;
        }
  
        setOpenRequestAcceptedModal(true);
        setDataInputEmail(''); 
        setDataInputPassword('');

        setTimeout(() => {
            navigate('/');
        }, 2000)
    };

     return (
        <div className='create-account-container'>
            <div className='create-account-card'>
                <img 
                className='create-account-img'
                src="/materials/iconForm.png" 
                alt="icon" />
                <h1>Давайте создадим учетную запись!</h1>


                <form onSubmit={(e) => {
                    e.preventDefault();
                    openModalData();
                }}>
                {showErrorModalEmpty && (
                    <div className='error-modal-data-all-data'>
                        <div className='error-modal-content-data'>
                            <h1>❌ Вы ничего не написали!</h1>
                        </div>
                    </div>
                )}

                <input 
                className='input-create-email'
                type="email"
                name="1" id="1" 
                placeholder='Введите ваш Email'
                value={dataInputEmail}
                onChange={(e) => setDataInputEmail(e.target.value)}
                required
                />

                {showErrorModalEmail && (
                    <div className='error-modal-data-email'>
                        <div className='error-modal-content-data-email'>
                            <h1>❌ Вы не написали Email</h1>
                        </div>
                    </div>
                )}
                <input 
                className='input-create-password'
                type="password" 
                name="2" id="2" 
                placeholder='Введите ваш Пароль'
                value={dataInputPassword}
                onChange={(e) => setDataInputPassword(e.target.value)}
                required
                />

                {showErrorModalPassword && (
                    <div className='error-modal-data-password'>
                        <div className='error-modal-content-data-password'>
                            <h1>❌ Вы не написали Пароль!</h1>
                        </div>
                    </div>
                )}

                <button 
                type="submit"
                onClick={openModalData}
                className='create-account-button'
                >
                Создать</button>
                </form>

                {openRequestAcceptedModal && (
                    <div className='modal-overlay-data'>
                        <div className='modal-accept-message-data'>
                            <h1>Регистрация прошла успешно</h1>
                            <button 
                            className='btn-okay-message-data'
                            onClick={closeModalDataAccount}
                            >Хорошо</button>
                        </div>
                    </div>
                )}

                {showUserAlreadyExistsModal && (
                    <div className='error-modal-user-exists'>
                        <div className='error-modal-user-exists-content'>
                            <h1>❌Пользователь с таким Email уже существует!</h1>
                        </div>
                    </div>
                )}

                <Link to="/" className="back-link"
                >
                → Вернуться на главную</Link>
            </div>
        </div>
    );

}

export default CreateAccountForm;