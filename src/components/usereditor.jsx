//why are you not pushing

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserEditor = ({ showError, showSuccess }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    givenName: '',
    familyName: '',
    fullName: '',
    role: '',
  });

  const { givenName, familyName, fullName, role, loggedInUser } = user;

  const handleDelete = async () => {
    if (loggedInUser && loggedInUser.role.includes('Technical Manager')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, {
          withCredentials: true,
        });
        showSuccess('User deleted successfully');
        navigate('/user/list'); // Redirect to user list after successful deletion
      } catch (error) {
        showError('Error deleting user. Please try again.');
        console.error('Error deleting user:', error);
      }
    } else {
      showError('You are not authorized to delete this user.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make two requests in parallel
        const [userResponse, loggedInUserResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, {
            withCredentials: true,
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/user/me`, {
            withCredentials: true,
          }),
        ]);

        setUser({
          ...userResponse.data,
          loggedInUser: loggedInUserResponse.data,
        });
      } catch (error) {
        showError('Error fetching user details. Please try again.');
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, [userId, showError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

const handleRoleChange = (e) => {
  if (loggedInUser && loggedInUser.role.includes('Technical Manager')) {
    const { value } = e.target;
    let roleValue;

    switch (value) {
      case 'Technical Manager':
      case 'Quality Analyst':
      case 'Developer':
      case 'Business Analyst':
      case 'Project Manager':
        roleValue = value;
        break;
      default:
        roleValue = user.role;
    }

    setUser((prevUser) => ({
      ...prevUser,
      role: roleValue,
      lastUpdatedOn: new Date().toLocaleString('en-US'),
      lastUpdatedBy: {
        userId: loggedInUser._id,
        fullName: loggedInUser.fullName,
        email: loggedInUser.email,
      },
    }));
  } else {
    showError('You are not authorized to update this user.');
  }
};




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loggedInUser && loggedInUser.role.includes('Technical Manager')) {
    try {
      // Send updated user details to the server

      const updatedUser = {
        givenName,
        familyName,
        fullName,
        role,
        };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/${userId}`,
        updatedUser,
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
  }
  };

  return (
    <>
      <h1>User Editor</h1>
      <form onSubmit={handleSubmit}>
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
          <select
            className='form-control'
            id='role'
            name='role'
            value={role}
            onChange={handleRoleChange}
          >
            <option value='Technical Manager'>Technical Manager</option>
            <option value='Quality Analyst'>Quality Analyst</option>
            <option value='Developer'>Developer</option>
            <option value='Business Analyst'>Business Analyst</option>
            <option value='Product Manager'>Product Manager</option>
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>
          Update User
        </button>
        {loggedInUser && loggedInUser.role.includes('Technical Manager') && (
        <button type='button' className='btn btn-danger' onClick={handleDelete}>
          Delete User
        </button>
      )}
      </form>
    </>
  );
};

export default UserEditor;
