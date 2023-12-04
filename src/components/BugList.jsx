import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BugListItem from './BugListItem';
import { Link } from 'react-router-dom';

const BugList = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/bug/list`, {
          withCredentials: true,
        });
        console.log('Response Data:', response.data);
        setBugs(response.data);
      } catch (error) {
        console.error('Error loading bugs:', error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchBugs();
  }, []);

  return (
    <div className="container-fluid">
      <h1>Bug List</h1>
      {!bugs.length ? (
        <h2>No bugs available</h2>
      ) : (
        <div className='row'>
          {bugs.map((bug) => (
            //<Link to={`/bug/${bug.id}`} key={bug.id}>
            <div key={bug._id} className='col-lg-4 mb-3'>
              <BugListItem bug={bug} />
              </div>
            //</Link>
            // <p>{bug.title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default BugList;
