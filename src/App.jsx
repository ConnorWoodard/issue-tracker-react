import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/login';
import RegisterForm from './components/register';
import BugList from './components/bugs';
import BugListItem from './components/bugitem';
import UserList from './components/users';
import UserListItem from './components/useritem';

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

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<div>Home Page</div>}
        />
        <Route
          path="/login"
          element={<LoginForm onLogin={handleLogin} onSwitchScreen={() => switchScreen('register')} />}
        />
        <Route
          path="/register"
          element={<RegisterForm onSwitchScreen={() => switchScreen('login')} />}
        />
        <Route
          path="/bugs"
          element={<BugList bugs={[{ id: '1', title: 'Sample Bug 1', description: 'Description 1' }, { id: '2', title: 'Sample Bug 2', description: 'Description 2' }]} />}
        />
        {/* Route for bug details */}
        <Route
          path="/bug/:id"
          element={<BugListItem bug={{ id: '1', title: 'Sample Bug 1', description: 'Description 1' }} />}
        />
        <Route
          path="/users"
          element={<UserList users={[{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Doe' }]} />}
        />
        <Route
          path="/user/:id"
          element={<UserListItem user={{ id: '1', name: 'John Doe' }} />}
        />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
