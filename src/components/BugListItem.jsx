// import React from 'react';
// import moment from 'moment';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const BugListItem = ({ bug }) => {

//   const [bugs, setBug] = useState(null);
//   const { bugId } = useParams();

//   const getStatusBadgeColor = () => {
//     return bug.closed ? 'bg-danger' : 'bg-success';
//   };

//   const getClassificationBadgeColor = () => {
//     switch (bug.classification) {
//       case 'approved':
//         return 'bg-success';
//       case 'unapproved':
//       case 'duplicate':
//         return 'bg-danger';
//       case 'unclassified':
//         return 'bg-warning';
//       default:
//         return 'bg-light';
//     }
//   };
  
//   useEffect(() => {
//     const fetchBug = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/bug/${bugId}`, {
//           withCredentials: true,
//         });

//         setBug(response.data);
//       } catch (error) {
//         console.error('Error loading bug:', error);
//         // Handle error, e.g., show an error message to the user
//       }
//     };

//     fetchBug();
//   }, [bugId]);

//   return (
//     <div className='mb-3'>
//       <div className='card'>
//         <div className='card-body'>
//           <h5 className='card-title'>{bugs.title}</h5>
//           <p className='card-text'>Description: {bug.description}</p>
//           <p className='card-text'>Steps to Reproduce: {bug.stepsToReproduce}</p>
//           {/* <p className='card-text'>Assigned to: {bug.assignedTo}</p> */}
//           <span className={`badge me-2 ${getClassificationBadgeColor()}`}>{bug.classification}</span>
//           <span className={`badge ${getStatusBadgeColor()}`}>{bug.closed ? 'Closed' : 'Open'}</span>
//         </div>
//         <div className='card-footer'>
//           {/* <p>Created {moment(bug.createdOn).fromNow()} by {bug.author.fullName}</p>
//           <p>Last updated {moment(bug.lastUpdatedOn).fromNow()} by {bug.lastUpdatedBy.fullName}</p>
//           <p>Classified {moment(bug.classifiedOn).fromNow()} by {bug.classifiedBy.fullName}</p>
//           <p>Assigned {moment(bug.assignedOn).fromNow()} by {bug.assignedBy.fullName}</p>
//           <p>Closed {moment(bug.closedOn).fromNow()} by {bug.closedBy.fullName}</p> */}
//         </div>
//         <div className='card-footer'>
//           {/* <h6>Comments:</h6>
//           {bug.comments.map(comment => (
//             <div key={comment.commentId}>
//               <p>{comment.user.fullName} said: {comment.text}</p>
//               <p>Created at {moment(comment.createdAt).fromNow()}</p>
//             </div>
//           ))} */}
//         </div>
//         <div className='card-footer'>
//           <h6>Test Cases:</h6>
//           {/* {bug.testCases.map(testCase => (
//             <div key={testCase.testId}>
//               <p>{testCase.isPassed ? 'Passed' : 'Failed'}</p>
//               <p>Created at {moment(testCase.createdOn).fromNow()} by {testCase.createdBy}</p>
//             </div>
//           ))} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BugListItem;

import React from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BugListItem = () => {
  const [bug, setBug] = useState(null);
  const { bugId } = useParams();

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
  
  useEffect(() => {
    const fetchBug = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/bug/${bugId}`, {
          withCredentials: true,
        });

        setBug(response.data);
      } catch (error) {
        console.error('Error loading bug:', error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchBug();
  }, [bugId]);

  if (!bug) {
    // Render a loading state or return null when bug is still null
    return null;
  }

  return (
    <div className='mb-3'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{bug.title}</h5>
          <p className='card-text'>Description: {bug.description}</p>
          <p className='card-text'>Steps to Reproduce: {bug.stepsToReproduce}</p>
          {/* <p className='card-text'>Assigned to: {bug.assignedTo}</p> */}
          <span className={`badge me-2 ${getClassificationBadgeColor()}`}>{bug.classification}</span>
          <span className={`badge ${getStatusBadgeColor()}`}>{bug.closed ? 'Closed' : 'Open'}</span>
        </div>
        <div className='card-footer'>
          {/* Rest of your code */}
        </div>
        {/* More card-footers and other content */}
      </div>
    </div>
  );
};

export default BugListItem;
