import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const UserListItem = ({ item, onEditUser }) => {
  const getRoleBadgeColor = (role) => {
    return role ? 'bg-primary' : 'bg-danger';
  };

  return (
    <div className='mb-3 container-fluid'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{item.fullName}</h5>
          <p className='card-text'>Email: {item.email}</p>
          <p className='card-text'>
            Roles: {item.role && item.role.length > 0 ? (
              item.role.map((role, index) => (
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
          Registered {moment(item.createdAt).fromNow()}
          <Link to={`/user/${item._id}`} className='btn btn-primary ms-2'>Edit User</Link>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
