//

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserListItem from './UserListItem';
import UserEditor from './UserEditor';
import { Link } from 'react-router-dom';

const UserList = ({ itemComponent: ItemComponent }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/user/list`, {
      withCredentials: true,
      params: {
        pageSize,
        pageNumber: currentPage,
      },
    })
      .then(response => {
        const { users: newUsers, totalUsers, pageSize, currentPage } = response.data;

        console.log('Users to be shown:', newUsers);

        setUsers(newUsers);
        setTotalUsers(totalUsers);
        setPageSize(pageSize);
        setCurrentPage(currentPage);
      })
      .catch(error => {
        console.error(error);
      });
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedUserId(null); // Clear selected user when changing pages
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className='mb-3 container-fluid'>
          {selectedUserId === user.id ? (
            <UserEditor userId={selectedUserId} />
          ) : (
            <UserListItem item={user} onEditUser={setSelectedUserId} />
          )}
        </div>
      ))}
      <div className="pagination-container">
        <span className="page-info">Page {currentPage} of {Math.ceil(totalUsers / pageSize)}</span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalUsers / pageSize)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
