import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BugListItem from './BugListItem';
import BugEditor from './BugEditor';

const BugList = ({ auth, showError, showSuccess }) => {
  const [bugs, setBugs] = useState([]);
  const [selectedBug, setSelectedBug] = useState(null);

  useEffect(() => {
    const fetchBugList = async () => {
      try {
        if (!auth) {
          showError('Authentication token is missing.');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/bug/list`, {
          withCredentials: true,
        });

        console.log('Response Data:', response.data);
        setBugs(response.data);
        showSuccess('Bug list loaded successfully');
      } catch (error) {
        showError('Error loading bug list. Please try again.');
        console.error('Error loading bug list:', error);

        // Check if it's an authentication error
        if (error.response && error.response.status === 401) {
          showError('Authentication failed. Please log in again.');
          // Handle authentication error, e.g., redirect to login page
        }
      }
    };

    fetchBugList();
  }, [auth, showError, showSuccess]);

  const handleBugClick = (bug) => {
    setSelectedBug(bug);
  };

  const handleEditorClose = () => {
    setSelectedBug(null);
  };

  return (
    <div>
      <h2>Bug List</h2>
      {bugs.length === 0 ? (
        <p>No bugs found.</p>
      ) : (
        <div className='row'>
          {bugs.map((bug) => (
            <div key={bug._id}>
              <BugListItem bug={bug} />
              <Link to={`/bug/${bug._id}`}>View Bug</Link>
              <button onClick={() => handleBugClick(bug)}>Edit Bug</button>
            </div>
          ))}
        </div>
      )}
      {selectedBug && <BugEditor bug={selectedBug} onClose={handleEditorClose} />}
    </div>
  );
};

export default BugList;
