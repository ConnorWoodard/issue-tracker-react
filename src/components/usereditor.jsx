import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const UserEditor = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    // Add other form fields as needed
  });

  const [validationErrors, setValidationErrors] = useState({
    fullName: '',
    email: '',
    // Add other validation errors as needed
  });

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }
    // Add other validation rules as needed
    return errors;
  };

  const isValidEmail = (email) => {
    // Add your email validation logic here
    return true; // For simplicity, always return true in this example
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // No validation errors, call the onSave event handler
      onSave(formData);
      // Close the editor
      onClose();
    } else {
      // Update validation errors
      setValidationErrors(errors);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '600px', background: '#343a40' }}>
            <MDBCardBody className='p-5'>
              <h2 className="fw-bold mb-2 text-uppercase" style={{ color: '#007bff' }}>Edit User</h2>

              <form onSubmit={handleSubmit} className="w-100">
                <MDBInput
                  wrapperClass='mb-4 mx-auto w-75'
                  labelClass='text-white'
                  label='Full Name'
                  id='fullName'
                  type='text'
                  name='fullName'
                  size="lg"
                  value={formData.fullName}
                  onChange={handleChange}
                  errorMessage={validationErrors.fullName}
                  background='#424242'
                  outline
                />

                <MDBInput
                  wrapperClass='mb-4 mx-auto w-75'
                  labelClass='text-white'
                  label='Email'
                  id='email'
                  type='email'
                  name='email'
                  size="lg"
                  value={formData.email}
                  onChange={handleChange}
                  errorMessage={validationErrors.email}
                  background='#424242'
                  outline
                />

                {/* Add other form fields as needed */}

                <MDBBtn
                  outline
                  className='mb-4 mx-auto w-75 d-flex justify-content-center'
                  color='white'
                  size='lg'
                  type="submit"
                  style={{ background: '#007bff', borderColor: '#007bff', width: '75%' }}
                >
                  Save
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default UserEditor;
