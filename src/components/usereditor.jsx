//why are you not pushing

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserEditor = ({ showError, showSuccess }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '', // not returned by API
    givenName: '',
    familyName: '',
    fullName: '',
    role: '',
  });

  const { email, givenName, familyName, fullName, role } = user;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, {
          withCredentials: true,
        });

        setUser(response.data);
      } catch (error) {
        showError('Error fetching user details. Please try again.');
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();
  }, [userId, showError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { ...user };
      delete userData.password; // Exclude password from the payload
      delete userData._id;
      delete userData.email;
      delete userData.createdAt;
      delete userData.lastUpdatedBy;
      delete userData.lastUpdatedOn;

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/${userId}`,
        userData,
        {
          withCredentials: true,
        }
      );

      showSuccess('User updated successfully');
      navigate('/user/list'); // Redirect to user list after a successful update
    } catch (error) {
      showError('Error updating user. Please try again.');
      console.error('Error updating user:', error);
    }
  };

  return (
    <>
      <h1>User Editor</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='givenName' className='form-label'>
            Given Name
          </label>
          <input
            type='text'
            className='form-control'
            id='givenName'
            name='givenName'
            value={givenName}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='familyName' className='form-label'>
            Family Name
          </label>
          <input
            type='text'
            className='form-control'
            id='familyName'
            name='familyName'
            value={familyName}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='fullName' className='form-label'>
            Full Name
          </label>
          <input
            type='text'
            className='form-control'
            id='fullName'
            name='fullName'
            value={fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='role' className='form-label'>
            Role
          </label>
          <input
            type='text'
            className='form-control'
            id='role'
            name='role'
            value={role}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Update User
        </button>
      </form>
    </>
  );
};

export default UserEditor;
