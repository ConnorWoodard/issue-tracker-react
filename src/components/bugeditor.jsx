//why are you not pushing

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Joi from 'joi';

// const bugInputSchema = Joi.object({
//   title: Joi.string().min(1).max(50),
//   description: Joi.string().min(10),
//   stepsToReproduce: Joi.string().min(10),
// });

const BugEditor = ({ showError, showSuccess }) => {
  const { bugId } = useParams();
  const navigate = useNavigate();

  const [bug, setBug] = useState({
    title: '',
    description: '',
    stepsToReproduce: '',
  });

  const { title, description, stepsToReproduce } = bug;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/bug/${bugId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setBug(response.data);
      })
      .catch((error) => {
        showError('Error fetching bug details. Please try again.');
        console.error('Error fetching bug details:', error);
      });
  }, [bugId, showError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBug((prevBug) => ({
      ...prevBug,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // const validationResult = bugInputSchema.validate(bug);
  
    // if (validationResult.error) {
    //   showError(validationResult.error.message);
    //   return;
    // }
  
    try {
      const bugData = { ...bug };
      delete bugData._id;
      delete bugData.classification;
      delete bugData.closed;
      delete bugData.createdOn;
      delete bugData.author;
      delete bugData.fixed;
      delete bugData.lastUpdatedBy;
      delete bugData.lastUpdatedOn;
      delete bugData.classifiedBy;
      delete bugData.classifiedOn;
      delete bugData.assignedBy;
      delete bugData.assignedOn;
      delete bugData.assignedToUserId;
      delete bugData.closedBy;
      delete bugData.closedOn;
      delete bugData.lastUpdated;
      delete bugData.comments;
      delete bugData.testCases;
      delete bugData.creationDate;
      delete bugData.assignedTo;
      delete bugData.timeLog;
      console.log(JSON.stringify(bugData));
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/bug/${bugId}`,
        bugData,
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
            value={title}
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
            value={description}
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
            value={stepsToReproduce}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Update Bug
        </button>
      </form>
    </>
  );
};

export default BugEditor;
