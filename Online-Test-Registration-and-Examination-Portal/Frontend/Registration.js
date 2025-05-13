import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    collegeId: '',
    profilePic: null,
    collegeIdCard: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      // Handle success - redirect to login
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}