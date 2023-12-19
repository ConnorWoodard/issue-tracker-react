import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../register.css';

function LoginForm({ onLogin, onNavigateToRegister, showError }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!formData.email || !formData.email.includes('@')) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
      // Display error message using the showError prop
      showError('Invalid form data. Please check the errors.');
      return;
    }

    // Validate password
    if (!formData.password || formData.password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long',
      }));
      // Display error message using the showError prop
      showError('Invalid form data. Please check the errors.');
      return;
    }

    try {
      // Send POST request to login endpoint with credentials
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, formData, {
        withCredentials: true,
      });

      // If successful, call the onLogin handler
      onLogin(response.data); // Assuming your API returns the user data

      // Reset form data and clear error messages
      setFormData({ email: '', password: '' });
      setErrors({ email: '', password: '' });

      // Display success message as a toast
      toast.success('Login successful!');
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

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100 swing-in-top-fwd'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>
              <script src="https://www.google.com/recaptcha/enterprise.js?render=6LdPoCgpAAAAAN9J7jsUbhUPNkMsSa3g-Lm7fVIe"></script>
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
                label='Password'
                id='password'
                type='password'
                name='password'
                size="lg"
                value={formData.password}
                onChange={handleChange}
                style={{ color: '#000', backgroundColor: '#fff' }} // Add this style to change text color and background color
              />
              {errors.password && <div className="text-danger mb-3">{errors.password}</div>}

                <MDBBtn
                  outline
                  className='mb-4 mx-auto w-75 d-flex justify-content-center'
                  color='white'
                  size='lg'
                  type="submit"
                  style={{ background: '#007bff', borderColor: '#007bff', width: '75%' }}
                >
                  Login
                </MDBBtn>
              </form>

              <p className="small mb-3 pb-lg-2"><Link to="/forgot-password" className="text-white-50" onClick={() => navigate('/forgot-password')}>Forgot password?</Link></p>
              <div className='d-flex flex-row mt-3 mb-5'>
                {/* ... (social media buttons) */}
              </div>

              <div>
                <p className="mb-0">Don't have an account? <Link to="/register" className="text-white-50 fw-bold" onClick={onNavigateToRegister}>Sign Up</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginForm;
