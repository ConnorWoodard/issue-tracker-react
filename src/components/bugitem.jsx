import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';

const BugListItem = ({ bug }) => {
  return (
    <MDBCard className='mb-4 bg-dark text-white'>
      <MDBCardBody>
        <MDBCardTitle style={{ color: '#007bff' }}>{bug.title}</MDBCardTitle>
        <MDBCardText style={{ color: 'white' }}>{bug.description}</MDBCardText>
        {/* Add more details as needed, such as bug status, date, etc. */}
      </MDBCardBody>
    </MDBCard>
  );
};

export default BugListItem;
