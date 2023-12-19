import React, { useState } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    if (!validateForm()) {
      toast.error('Invalid form data. Please check the errors.');
      return;
    }
  
    setLoading(true);
  
    try {
      // Send POST request to forgot-password endpoint with form data
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/forgot-password`, formData, {
        withCredentials: true,
      });
  
      // If successful, display success message as a toast
      toast.success(response.data.message);
      setMessage('If you do not receive an email. Please reset the form'); // Set the message state for rendering
  
    } catch (err) {
      // Handle errors
      const errorMessage = err?.response?.data?.error || err.message;
      const errorDetails = err?.response?.data?.error?.details;
  
      // Display error message as a toast
      toast.error(errorMessage);
  
      if (errorDetails) {
        console.error(errorDetails); // Log detailed error information
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ email: '' });
    setMessage('');
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate email
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <MDBContainer fluid className='h-100'>
      <MDBRow className='h-100 d-flex justify-content-center align-items-center'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              {message ? (
                <div className='mb-3 text-center text-white'>
                  <p>{message}</p>
                  <MDBBtn
                    outline
                    color='white'
                    size='lg'
                    onClick={handleReset}
                    style={{ background: '#007bff', borderColor: '#007bff', width: '75%' }}
                  >
                    Reset Form
                  </MDBBtn>
                </div>
              ) : (
                <>
                  <h3 className="fw-bold mb-2 text-uppercase">New Password?</h3>

                  <form onSubmit={handleSubmit} className="w-100">
                    <MDBInput
                      wrapperClass='mb-4 mx-auto w-75'
                      labelClass='text-grey'
                      label='Email address'
                      id='email'
                      type='email'
                      name='email'
                      size="lg"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ color: '#000', backgroundColor: '#fff' }}
                    />
                    {errors.email && <div className="text-danger mb-3">{errors.email}</div>}

                    <MDBBtn
                      outline
                      className='mb-4 mx-auto w-75 d-flex justify-content-center'
                      color='white'
                      size='lg'
                      type="submit"
                      style={{ background: '#007bff', borderColor: '#007bff', width: '75%' }}
                    >
                      {loading ? 'Please wait...' : 'Send Reset Email'}
                    </MDBBtn>
                  </form>
                </>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ForgotPassword;
