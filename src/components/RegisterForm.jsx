import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

const RegisterForm = ({ onLogin, showError, onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    givenName: '',
    familyName: '',
    fullName: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    givenName: '',
    familyName: '',
    fullName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      showError('Invalid form data. Please check the errors.');
      return;
    }

    try {
      // Send POST request to register endpoint with form data
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/register`, formData, {
        withCredentials: true,
      });

      // If successful, call the onLogin handler
      onLogin(response.data); // Assuming your API returns the user data

      // Reset form data and clear error messages
      setFormData({
        email: '',
        password: '',
        givenName: '',
        familyName: '',
        fullName: '',
      });
      setErrors({
        email: '',
        password: '',
        givenName: '',
        familyName: '',
        fullName: '',
      });

      // Display success message as a toast
      toast.success('Registration successful!');
    } catch (err) {
      // Handle errors
      const errorMessage = err?.response?.data?.error || err.message;
      const errorDetails = err?.response?.data?.error?.details;

      // Display error message using the showError prop
      showError(errorMessage);

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

    // Validate password
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    // Validate givenName and familyName
    if (!formData.givenName) {
      newErrors.givenName = 'Given name is required';
      isValid = false;
    }

    if (!formData.familyName) {
      newErrors.familyName = 'Family name is required';
      isValid = false;
    }

    // Validate fullName
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden slide-in-blurred-top'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: '#007bff' }}>
            Welcome <br />
            <span style={{ color: 'white' }}>to the bug issue tracker</span>
          </h1>
          <p className='px-3' style={{ color: 'white' }}>
            Once registered, you will be able to add bugs that you find and describe them.
            You will also be able to help fix bugs when given the appropriate role.
          </p>
        </MDBCol>

        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-grey text-white'>
            <MDBCardBody className='p-5'>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' name='givenName' value={formData.givenName} onChange={handleChange} />
                  {errors.givenName && <div className="text-danger mb-3">{errors.givenName}</div>}
                </MDBCol>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text' name='familyName' value={formData.familyName} onChange={handleChange} />
                  {errors.familyName && <div className="text-danger mb-3">{errors.familyName}</div>}
                </MDBCol>
              </MDBRow>
              <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' name='email' value={formData.email} onChange={handleChange} />
              {errors.email && <div className="text-danger mb-3">{errors.email}</div>}

              <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' name='password' value={formData.password} onChange={handleChange} />
              {errors.password && <div className="text-danger mb-3">{errors.password}</div>}

              {/* New fullName input */}
              <MDBInput wrapperClass='mb-4' label='Full Name' id='form-fullname' type='text' name='fullName' value={formData.fullName} onChange={handleChange} />
              {errors.fullName && <div className="text-danger mb-3">{errors.fullName}</div>}

              <MDBBtn className='w-100 mb-4' size='md' onClick={handleSubmit}>Sign up</MDBBtn>

              {/* Link for users who already have an account */}
              <div>
                <p className="mb-0 text-black">Already have an account? <Link to="/login" className="text-black-50 fw-bold" onClick={onNavigateToLogin}>Login</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default RegisterForm;
