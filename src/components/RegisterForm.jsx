import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from 'mdb-react-ui-kit';
import '../register.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    id: nanoid(),
    email: '',
    password: '',
    fullName: '',
    givenName: '',
    familyName: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/register', formData);
      console.log('Registration successful:', response.data);
      setFormData({
        id: nanoid(),
        email: '',
        password: '',
        fullName: '',
        givenName: '',
        familyName: '',
        role: '',
      });
      // Call the registration success event handler if needed
    } catch (error) {
      console.error('Registration failed:', error.message);
      // Handle registration failure as needed
    }
  };

  const handleLoginLinkClick = () => {
    console.log('Navigate to login screen');
    // Handle navigation to login screen logic here
  };

  useEffect(() => {
    const formElement = document.getElementById('registerForm');
    if (formElement) {
      formElement.classList.add('slide-in-blurred-top');
    }
  }, []);

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

          <MDBCard className='my-5 bg-dark text-white'>
            <MDBCardBody className='p-5'>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' name='firstName' value={formData.firstName} onChange={handleChange} />
                </MDBCol>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text' name='lastName' value={formData.lastName} onChange={handleChange} />
                </MDBCol>
              </MDBRow>
              <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' name='email' value={formData.email} onChange={handleChange} />
              <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' name='password' value={formData.password} onChange={handleChange} />
              <MDBBtn className='w-100 mb-4' size='md' onClick={handleSubmit}>sign up</MDBBtn>
              <div className="text-center">
                <p>or sign up with:</p>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm" />
                </MDBBtn>
              </div>
              <div className='text-center'>
                <p className="mb-0">Have an Account? <a href="/login" className="text-white-50 fw-bold" onClick={handleLoginLinkClick}>Sign In</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default RegisterForm;
