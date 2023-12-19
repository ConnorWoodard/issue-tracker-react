


  
  // BugListItem.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BugListItem = ({ bug }) => {

  const getStatusBadgeColor = () => {
    return bug && bug.closed ? 'bg-danger' : 'bg-success';
  };

  const getClassificationBadgeColor = () => {
    switch (bug && bug.classification) {
      case 'approved':
        return 'bg-success';
      case 'unapproved':
      case 'duplicate':
        return 'bg-danger';
      case 'unclassified':
        return 'bg-warning';
      default:
        return 'bg-light';
    }
  };

  return (
    <div className='mb-3 container-fluid'>
      <div className='card bug-card'>
        <div className='card-body'>
          <h5 className='card-title'>{bug.title}</h5>
          <p className='card-text'>Description: {bug.description}</p>
          <p className='card-text'>Steps to Reproduce: {bug.stepsToReproduce}</p>
          <span className={`badge me-2 ${getClassificationBadgeColor()}`}>{bug.classification}</span>
          <span className={`badge ${getStatusBadgeColor()}`}>{bug.closed ? 'Closed' : 'Open'}</span>
        </div>
        <div className='card-footer'>
        <Link to={`/bug/detail/${bug._id}`} className="btn btn-primary">
          View Bug
        </Link>&nbsp;&nbsp;
        <Link to={`/bug/edit/${bug._id}`}>Edit Bug</Link>
        </div>
      </div>
    </div>
  );
};

export default BugListItem;
