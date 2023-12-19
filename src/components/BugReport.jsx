import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BugReport = () => {
  const navigate = useNavigate();
  const [bugData, setBugData] = useState({
    title: '',
    description: '',
    stepsToReproduce: '',
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
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
  
    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBugData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check if the user has one of the allowed roles
      if (user && (user.role.includes('Developer') || user.role.includes('Quality Analyst') || user.role.includes('Business Analyst') || user.role.includes('Product Manager') || user.role.includes('Technical Manager'))) {
        // User has an allowed role, proceed with bug reporting
  
        // Validate bug data locally if needed
        if (bugData.title.length < 1 || bugData.title.length > 50) {
          toast.error('Bug Title must be between 1 and 50 characters');
          return;
        }

        if (bugData.description.length < 10) {
          toast.error('Bug Description must be at least 10 characters');
          return;
        }

        if (bugData.stepsToReproduce.length < 10) {
          toast.error('Steps to Reproduce must be at least 10 characters');
          return;
        }
        // Send bug report to the server
        await axios.post(`${import.meta.env.VITE_API_URL}/api/bug/new`, bugData, {
          withCredentials: true,
        });
  
        // Redirect to bug list or a success page
        navigate('/bug/list'); // Update with your desired route
      } else {
        // User doesn't have an allowed role, show an error message or handle it as needed
        console.error('User does not have the necessary role to report a bug.');
      }
    } catch (error) {
      // Handle other errors, e.g., show an error message to the user
      console.error('Error reporting bug:', error);
    }
  };

  return (
    <div>
      <h1>Report a New Bug</h1>
      <form onSubmit={handleSubmit}>
        {/* Bug Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Bug Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={bugData.title}
            onChange={handleInputChange}
          />
        </div>

        {/* Bug Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Bug Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={bugData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Steps to Reproduce */}
        <div className="mb-3">
          <label htmlFor="stepsToReproduce" className="form-label">
            Steps to Reproduce
          </label>
          <textarea
            className="form-control"
            id="stepsToReproduce"
            name="stepsToReproduce"
            value={bugData.stepsToReproduce}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Report Bug
        </button>
      </form>
    </div>
  );
};

export default BugReport;
