import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { Link } from 'react-router-dom';
import '../register.css';

const CustomNavbar = ({ auth, onLogout }) => {
  const gradientBackground = {
    background: 'linear-gradient(to right, #800080, #ff0000)', // Purple to Red gradient
  };

  const onClickLogout = (evt) => {
    evt.preventDefault();
    onLogout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={gradientBackground}>
      <div className="container-fluid">
        <Link to="/login" className="navbar-brand text-white">
          Bug Tracker
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link text-white">
                Home
              </Link>
            </li>
            {!auth && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-white">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link text-white">
                    Register
                  </Link>
                </li>
              </>
            )}
            {auth && (
              <>
                <li className="nav-item">
                  <Link to="/users" className="nav-link text-white">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/bugs" className="nav-link text-white">
                    Bugs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-white" onClick={(evt) => onClickLogout(evt)}>
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
