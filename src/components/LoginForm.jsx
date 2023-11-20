import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import '../register.css';

function LoginForm({ onLogin, onNavigateToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the entered credentials are valid
    if (formData.email === 'admin@example.com' && formData.password === 'password') {
      // Call the login event handler
      onLogin();
    } else {
      // Handle invalid credentials
      alert('Invalid email or password');
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

              <form onSubmit={handleSubmit} className="w-100">
                <MDBInput
                  wrapperClass='mb-4 mx-auto w-75'
                  labelClass='text-white'
                  label='Email address'
                  id='email'
                  type='email'
                  name='email'
                  size="lg"
                  value={formData.email}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass='mb-4 mx-auto w-75'
                  labelClass='text-white'
                  label='Password'
                  id='password'
                  type='password'
                  name='password'
                  size="lg"
                  value={formData.password}
                  onChange={handleChange}
                />
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

              <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
              <div className='d-flex flex-row mt-3 mb-5'>
                {/* ... social media buttons */}
              </div>

              <div>
                <p className="mb-0">Don't have an account? <a href="/register" className="text-white-50 fw-bold" onClick={onNavigateToRegister}>Sign Up</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginForm;
