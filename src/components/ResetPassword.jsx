import React, { useState } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';

function ResetPassword() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    resetToken: resetToken,
    newPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    resetToken: '',
    newPassword: '',
  });

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

    try {
      // Send POST request to reset-password endpoint with form data
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/reset-password`, formData, {
        withCredentials: true,
      });

      // If successful, display success message as a toast
      toast.success(response.data.message);

      // Redirect to the login page or another appropriate page
      navigate('/login'); // Replace with your actual path
    } catch (err) {
      // Handle errors
      const errorMessage = err?.response?.data?.error || err.message;
      const errorDetails = err?.response?.data?.error?.details;

      // Display error message as a toast
      toast.error(errorMessage);

      if (errorDetails) {
        console.error(errorDetails); // Log detailed error information
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate email
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    // Validate resetToken
    if (!formData.resetToken) {
      newErrors.resetToken = 'Reset token is required';
      isValid = false;
    }

    // Validate newPassword
    if (!formData.newPassword || formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100 swing-in-top-fwd'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Reset Password</h2>

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
                  style={{ color: '#000', backgroundColor: '#fff' }} // Add this style to change text color and background color
                />
                {errors.email && <div className="text-danger mb-3">{errors.email}</div>}

                <MDBInput
                  wrapperClass='mb-4 mx-auto w-75'
                  labelClass='text-grey'
                  label='Reset Token'
                  id='resetToken'
                  type='text'
                  name='resetToken'
                  size="lg"
                  readOnly
                  value={formData.resetToken}
                  onChange={handleChange}
                />
                {errors.resetToken && <div className="text-danger mb-3">{errors.resetToken}</div>}

                <MDBInput
                  wrapperClass='mb-4 mx-auto w-75'
                  labelClass='text-grey'
                  label='New Password'
                  id='newPassword'
                  type='password'
                  name='newPassword'
                  size="lg"
                  value={formData.newPassword}
                  onChange={handleChange}
                  style={{ color: '#000', backgroundColor: '#fff' }} // Add this style to change text color and background color
                />
                {errors.newPassword && <div className="text-danger mb-3">{errors.newPassword}</div>}

                <MDBBtn
                  outline
                  className='mb-4 mx-auto w-75 d-flex justify-content-center'
                  color='white'
                  size='lg'
                  type="submit"
                  style={{ background: '#007bff', borderColor: '#007bff', width: '75%' }}
                >
                  Reset Password
                </MDBBtn>
              </form>

              {/* Add any additional content as needed */}

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ResetPassword;
