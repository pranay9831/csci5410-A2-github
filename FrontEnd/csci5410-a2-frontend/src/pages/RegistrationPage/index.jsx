import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/index';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const navigate = useNavigate();

  const handleRegister = async ({ email, password, name, loc }) => {
    try {
        const response = await fetch('https://registration-microservice-sple5s3g7q-nn.a.run.app/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email:email, password:password, name:name, location:loc })
        });

        if (!response.ok) {
          alert('Try Again')
            throw new Error('Registration failed');
        }

        const data = await response.json();
        console.log(data);

        // If registration is successful, navigate to the LoginPage
        navigate('/login');
    } catch (error) {
        console.error('Failed to register:', error);
    }
};


  return (
    <div>
      <h1>Register</h1>
      <RegistrationForm onRegister={handleRegister} />
    </div>
  );
}

export default RegistrationPage;
