import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BugList from './components/BugList';
import BugListItem from './components/BugListItem';
import UserList from './components/UserList';
import UserListItem from './components/UserListItem';
import UserEditor from './components/UserEditor';
import BugEditor from './components/BugEditor';
import BugDetail from './components/BugDetail';
import BugReport from './components/BugReport';
import CustomNavbar from './components/CustomNavbar';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Footer from './components/Footer';
import axios from 'axios';






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

  function showError(message) {
    toast(message, { type: 'error', position: 'bottom-right' });
  }

  function showSuccess(message) {
    toast(message, { type: 'success', position: 'bottom-right' });
  }

  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();

  function onLogin(auth) {
    console.log(auth);
    setAuth(auth);
    navigate('/login');
    showSuccess('Logged in!');
  }
  function onLogout() {
    axios.post(`${import.meta.env.VITE_API_URL}/api/user/logout`, {}, {
      withCredentials: true,
    })
    .then(response => {
      localStorage.removeItem('user');
      setAuth(null);
      navigate('/login');
      showSuccess('Logged out!');
    })
    .catch(error => {
      console.error(error);
    });
  }
  

  return (
    <>
      <CustomNavbar auth={auth} onLogout={onLogout}/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <main className='container my-5'>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm onLogin={onLogin} onSwitchScreen={() => switchScreen('register')} showError={showError}  />} />
        <Route path="/register" element={<RegisterForm onLogin={onLogin} showError={showError} />} />
        <Route path="/bug/list" element={<BugList auth={auth} showError={showError} showSuccess={showSuccess} />} />
        <Route path="/bug/edit/:bugId" element={<BugEditor showError={showError} showSuccess={showSuccess} />} />
        <Route path="/bug/detail/:bugId" element={<BugDetail />} />
        <Route path="/bug/report" element={<BugReport showError={showError} showSuccess={showSuccess} />} />
        <Route path="/user/list" element={<UserList itemComponent={UserListItem} />} />
        <Route path="/user/:userId" element={<UserEditor showError={showError} showSuccess={showSuccess}/>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
