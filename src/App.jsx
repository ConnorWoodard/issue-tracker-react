import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BugList from './components/bugs';
import BugListItem from './components/bugitem';
import UserList from './components/users';
import UserListItem from './components/useritem';
import CustomNavbar from './components/CustomNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Footer from './components/Footer';




const App = () => {
  // State to manage the current screen
  const [currentScreen, setCurrentScreen] = useState('home');

  // State to manage login status
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Event handler to switch screens
  const switchScreen = (screen) => {
    setCurrentScreen(screen);
  };

  // Event handler for login
  const handleLogin = () => {
    // Perform login logic (setLoggedIn(true), etc.)
    // For now, just switch to the home screen on login
    setLoggedIn(true);
    switchScreen('home');
  };

  function showError(message) {
    toast(message, { type: 'error', position: 'bottom-right' });
  }

  function showSuccess(message) {
    toast(message, { type: 'success', position: 'bottom-right' });
  }

  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();

  function onLogin(auth) {
    setAuth(auth);
    navigate('/bug/list');
    showSuccess('Logged in!');
  }
  function onLogout() {
    setAuth(null);
    navigate('/login');
    showSuccess('Logged out!');
  }

  return (
    <>
      <CustomNavbar auth={auth} onLogout={onLogout}/>
      <ToastContainer />
      <main className='container my-5'>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} onSwitchScreen={() => switchScreen('register')} />} />
        <Route path="/register" element={<RegisterForm onSwitchScreen={() => switchScreen('login')} />} />
        <Route path="/bug/list" element={<BugList />} />
        {/* <Route path="/bug/:bugId" element={<BugEditor />} /> */}
        <Route path="/user/list" element={<UserList />} />
        {/* <Route path="/user/:userId" element={<UserEditor />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
