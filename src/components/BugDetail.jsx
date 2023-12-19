import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BugDetail = () => {
  const { bugId } = useParams();
  const [bug, setBug] = useState(null);
  const [selectedComments, setSelectedComments] = useState([]);
  const [selectedTestCases, setSelectedTestCases] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [userId, setUserId] = useState(null); // New state to store user ID
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user ID during component initialization
    const fetchUserId = async () => {
      try {
        const userResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/me`, // Adjust the URL based on your user API route
          {
            withCredentials: true,
          }
        );

        // Assuming the user data has an 'id' property
        setUserId(userResponse.data._id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserId(); // Fetch user ID when the component mounts

    // Fetch bug details
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/bug/${bugId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setBug(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bug details:', error);
      });
  }, [bugId]);

  const handleCommentsChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedComments(selectedValues);
  };

  const handleTestCasesChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedTestCases(selectedValues);
  };

  const handleEditClick = () => {
    navigate(`/bug/edit/${bugId}`);
  };

  const handleAddCommentClick = () => {
    setIsAddingComment(true);
  };

  const handleSaveCommentClick = async () => {
    try {
      // Send the new comment to the server and update the bug data
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/comment/new`,
        { text: newComment, userId: JSON.stringify(userId) },
        {
          withCredentials: true,
        }
      );
  
      // Reset the newComment state and toggle off the textarea
      setNewComment('');
      setIsAddingComment(false);
  
      // Refetch bug details, including the updated comments
      const bugDetailsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bug/${bugId}`,
        {
          withCredentials: true,
        }
      );
      setBug(bugDetailsResponse.data);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  

  return (
    <div className="card">
      <div className="card-body">
        <button className="btn btn-light btn-sm float-end" onClick={handleEditClick}>
          <i className="fas fa-edit"></i>
        </button>
        <h2 className="card-title">{bug && bug.title}</h2>
        <div className="card-text">
          <strong>Description:</strong>
          <p>{bug && bug.description}</p>
        </div>
        <div className="card-text">
          <strong>Classification:</strong>
          <p>{bug && bug.classification}</p>
        </div>
        <div className="card-text">
          <strong>Closed:</strong>
          <p>{bug && (bug.closed ? 'Yes' : 'No')}</p>
        </div>
        <div className="card-text">
          <strong>Comments:</strong>
          {isAddingComment ? (
            <>
              <textarea
                className="form-control"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button className="btn btn-primary" onClick={handleSaveCommentClick}>
                Save
              </button>
            </>
          ) : (
            <>
              {bug &&
                (bug.comments && bug.comments.length > 0 ? (
                  <select
                    multiple
                    className="form-control"
                    value={selectedComments}
                    onChange={handleCommentsChange}
                  >
                    {bug.comments.map((comment) => (
                      <option key={comment._id} value={comment._id}>
                        {comment.text}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>No comments available for this bug.</p>
                ))}
              <button className="btn btn-link" onClick={handleAddCommentClick}>
                Add Comment
              </button>
            </>
          )}
        </div>
        {/* ... (remaining code) */}
      </div>
    </div>
  );
};

export default BugDetail;
