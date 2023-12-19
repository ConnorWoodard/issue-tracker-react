import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { set } from 'lodash';

const BugEditor = ({ showError, showSuccess }) => {
  const { bugId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);



  const [bug, setBug] = useState({
    title: '',
    description: '',
    stepsToReproduce: '',
    // Add other properties as needed
  });
  let initialBugStatus = null;
  const [originalClassification, setOriginalClassification] = useState(null);
  const [originalAssignedTo, setOriginalAssignedTo] = useState(null);
  const [bugStatus, setBugStatus] = useState(initialBugStatus);

  useEffect(() => {
    const fetchBugDetails = async () => {
      try {
        const bugResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bug/${bugId}`,
          {
            withCredentials: true,
          }
        );
        setBug(bugResponse.data);
        setOriginalClassification(bugResponse.data.classification);
        setOriginalAssignedTo(bugResponse.data.assignedToUserId);
        initialBugStatus = bugResponse.data.closed === 'true';
        setBugStatus(initialBugStatus);
      } catch (error) {
        showError('Error fetching bug details. Please try again.');
        console.error('Error fetching bug details:', error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/me`,
          {
            withCredentials: true,
          }
        );
        setUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        let allUsers = [];
        let pageSize = 100;
    
          const usersResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user/list?pageSize=${pageSize}`,
            {
              withCredentials: true,
            }
          );
    
          allUsers = allUsers.concat(usersResponse.data.users);
        
    
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    

    fetchAllUsers();
    fetchBugDetails();
    fetchUserDetails();
  }, [bugId, showError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBug((prevBug) => ({
      ...prevBug,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    // Convert the string value to a boolean
    const status = e.target.value === 'true';
    // Set the bug status
    setBugStatus(status);
  };
  
  
  const handleClassificationChange = (e) => {
    if (user && user.role.includes('Business Analyst')) {
      const { value } = e.target;
  
      let classificationValue;
  
      // Explicitly check for the selected option and set the value
      switch (value) {
        case 'approved':
        case 'unapproved':
        case 'duplicate':
          classificationValue = value;
          break;
        default:
          classificationValue = 'unclassified';
      }
  
      setBug((prevBug) => ({
        ...prevBug,
        classification: classificationValue,
        classifiedOn: new Date().toLocaleString('en-US'),
        classifiedBy: {
          fullName: user.fullName,
          userId: user._id,
        },
      }));
    } else {
      showError('You do not have the necessary role to classify a bug.');
    }
  };

  const handleUserSelection = (e) => {
    const selectedUserId = e.target.value;
    handleBugAssignment(selectedUserId);
  };

  const handleBugAssignment = (selectedUserId) => {
    if (user) {
      const selectedUser = users.find((user) => user._id === selectedUserId);

      setBug((prevBug) => ({
        ...prevBug,
        // assignedBy: {fullName: user.fullName, userId: user._id},
        // assignedOn: new Date().toLocaleString('en-US'),
        assignedToUserId: String(selectedUser?._id || null),
      }));
    } else {
      showError('Unable to assign bug. User information not available.');
    }
  };

  const handleBugStatusUpdate = async () => {
    try {
      if (user && user.role.includes('Business Analyst')) {
        // Only proceed if the bug status has changed
        if (bugStatus !== initialBugStatus) {
          // Update bug status using the spread operator
          setBug((prevBug) => ({
            ...prevBug,
            closed: String(bugStatus),
            closedBy: { fullName: user.fullName, userId: user._id },
            closedOn:new Date().toLocaleString('en-US'),
          }));
  
          // Send the status update to the server
          await axios.put(
            `${import.meta.env.VITE_API_URL}/api/bug/${bugId}/close`,
            {
              closed: String(bugStatus), // Convert boolean to string
            },
            { withCredentials: true }
          );
  
          showSuccess(`Bug status updated to ${bugStatus ? 'closed' : 'open'}`);
          // Optionally, you can fetch updated bug details after the status change
          // await fetchBugDetails();
  
          // Update the initialBugStatus to the new value
          setBugStatus(bugStatus);
        } else {
          // Bug status has not changed
          showSuccess('Bug status remains unchanged');
        }
      } else {
        showError('You do not have the necessary role to update bug status.');
      }
    } catch (error) {
      showError('Error updating bug status. Please try again.');
      console.error('Error updating bug status:', error);
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send updated bug details to the server
      const updatedBug = {
        title: bug.title,
        description: bug.description,
        stepsToReproduce: bug.stepsToReproduce,
        // Add other properties as needed

      };

      console.log('Bug Data:', updatedBug);

      if (bug.classification !== originalClassification) {
        // Classification has changed, send a separate request
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/bug/${bugId}/classify`,
          {classification: bug.classification},
          { withCredentials: true }
        );
      }

      if (bug.assignedToUserId !== originalAssignedTo) {
        // Assignment has changed, send a separate request
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/bug/${bugId}/assign`,
          { assignedToUserId: bug.assignedToUserId },
          { withCredentials: true }
        );
      }

      // Update bug details
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/bug/${bugId}`,
        updatedBug,
        {
          withCredentials: true,
        }
      );
      showSuccess('Bug updated successfully');
      navigate('/bug/list'); // Redirect to bug list after a successful update
    } catch (error) {
      showError('Error updating bug. Please try again.');
      console.error('Error updating bug:', error);
    }
  };

  return (
    <>
      <h1>Bug Editor</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='title'
            name='title'
            value={bug.title}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            className='form-control'
            id='description'
            name='description'
            value={bug.description}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='stepsToReproduce' className='form-label'>
            Steps to Reproduce
          </label>
          <textarea
            className='form-control'
            id='stepsToReproduce'
            name='stepsToReproduce'
            value={bug.stepsToReproduce}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='classification' className='form-label'>
            Classification
          </label>
          <select
            className='form-control'
            id='classification'
            name='classification'
            value={bug.classification || 'unclassified'} // Handle null or undefined classification
            onChange={handleClassificationChange}
          >
            <option value='unclassified'>Unclassified</option>
            <option value='approved'>Approved</option>
            <option value='unapproved'>Unapproved</option>
            <option value='duplicate'>Duplicate</option>
            {/* Add other classification options as needed */}
          </select>
        </div>
        <div className='input-group mb-3'>
          <label htmlFor='assignedTo' className='form-label'>
            Assign To
          </label>
          <select
            className='form-control'
            id='assignedTo'
            name='assignedTo'
            value={bug.assignedToUserId || ''} // Handle null or undefined assignedToUserId
            onChange={handleUserSelection}
          >
            <option value=''>Unassigned</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullName}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-3'>
        <label htmlFor='bugStatus' className='form-label'>
          Bug Status
        </label>
        <div className='input-group'>
          <select
            className='form-control'
            id='bugStatus'
            name='bugStatus'
            value={bugStatus ? 'true' : 'false'}
            onChange={handleStatusChange}
          >
            <option value='true'>Closed</option>
            <option value='false'>Open</option>
          </select>
          {/* Update bug status when the user changes it */}
          <button type='button' className='btn btn-primary' onClick={handleBugStatusUpdate}>
            Update Status
          </button>
        </div>
      </div>
        <button type='submit' className='btn btn-primary'>
          Update Bug
        </button>
      </form>
    </>
  );
};

export default BugEditor;
