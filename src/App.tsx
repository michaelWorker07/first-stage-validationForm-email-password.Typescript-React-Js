import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import LoginForm from './pages/Form';
import { TodoPage } from './pages/TodoPage';
import SecretPage from './pages/secretPage';
import CreateAccountForm from './pages/CreateAccountForm';

const App: React.FC = () => {
  const isAuth = !!localStorage.getItem('token');

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route 
          path="/todo" 
          element={isAuth ? <TodoPage /> : <Navigate to="/" />} 
        />
        <Route path="/forgotpassworduser" element={<SecretPage />} />  
        <Route path="/createaccount" element={<CreateAccountForm />} /> 
      </Routes>
    </HashRouter>
  );
};

export default App;

// по умол. BrowserRouter поставил хесш для гит