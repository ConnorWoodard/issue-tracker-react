import React, { useState } from 'react';
import UserListItem from './UserListItem';
import UserEditor from './UserEditor'; // Import your UserEditor component

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleEditorClose = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user.id}>
          <UserListItem user={user} />
          <button onClick={() => handleUserClick(user)}>Edit User</button>
        </div>
      ))}
      {selectedUser && (
        <UserEditor user={selectedUser} onClose={handleEditorClose} />
      )}
    </div>
  );
};

export default UserList;
