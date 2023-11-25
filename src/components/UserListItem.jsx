import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';

const UserListItem = ({ user }) => {
  return (
    <MDBCard className='mb-4 bg-dark text-white'>
      <MDBCardBody>
        <MDBCardTitle style={{ color: '#007bff' }}>{user.name}</MDBCardTitle>
        <MDBCardText style={{ color: 'white' }}>
          <strong>Email:</strong> {user.email}<br />
          {/* Add more user details as needed */}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default UserListItem;
