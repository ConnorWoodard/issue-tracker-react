import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const BugEditor = ({ bug, onSave }) => {
  const [formData, setFormData] = useState({
    title: bug.title || '',
    description: bug.description || '',
    // Add other form fields as needed
  });

  const [validationErrors, setValidationErrors] = useState({
    title: '',
    description: '',
    // Add other validation errors as needed
  });

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    // Add other validation rules as needed
    return errors;
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
              <h2 className="fw-bold mb-2 text-uppercase" style={{ color: '#007bff' }}>Edit Bug</h2>

              <form onSubmit={handleSubmit} className="w-100">
                <MDBInput
                  wrapperClass='mb-4 mx-auto w-75'
                  labelClass='text-white'
                  label='Title'
                  id='title'
                  type='text'
                  name='title'
                  size="lg"
                  value={formData.title}
                  onChange={handleChange}
                  errorMessage={validationErrors.title}
                  background='#424242'
                  outline
                />

                <MDBInput
                  wrapperClass='mb-4 mx-auto w-75'
                  labelClass='text-white'
                  label='Description'
                  id='description'
                  type='textarea'
                  name='description'
                  size="lg"
                  value={formData.description}
                  onChange={handleChange}
                  errorMessage={validationErrors.description}
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

export default BugEditor;
