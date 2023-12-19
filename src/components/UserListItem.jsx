import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const UserListItem = ({ user, onEditUser }) => {
  const getRoleBadgeColor = (role) => {
    return role ? 'bg-primary' : 'bg-danger';
  };

  return (
    <div className='mb-3 container-fluid'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{user.fullName}</h5>
          <p className='card-text'>Email: {user.email}</p>
          <p className='card-text'>
            Roles: {user.role && user.role.length > 0 ? (
              user.role.map((role, index) => (
                <span key={index} className={`badge me-2 ${getRoleBadgeColor(role)}`}>
                  {role}
                </span>
              ))
            ) : (
              <span className='badge bg-danger'>No Role</span>
            )}
          </p>
        </div>
        <div className='card-footer'>
          Registered {moment(user.createdAt).fromNow()}
          <Link to={`/user/${user._id}`} className='btn btn-primary ms-2'>Edit User</Link>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
