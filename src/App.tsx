import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/Form';
import { TodoPage } from './pages/TodoPage';

const App: React.FC = () => {
 
  const isAuth = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route 
          path="/todo" 
          element={isAuth ? <TodoPage /> : <Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;