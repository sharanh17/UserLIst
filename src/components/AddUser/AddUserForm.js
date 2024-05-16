import React, { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';

const AddUserForm = ({ addUser, setShowAddForm }) => {
  const initialFormState = { firstName: '', lastName: '', email: '', department: '' };
  const [user, setUser] = useState(initialFormState);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!user.firstName) errors.firstName = 'First Name is required';
    if (!user.lastName) errors.lastName = 'Last Name is required';
    if (!user.email) errors.email = 'Email is required';
    if (user.email && !/\S+@\S+\.\S+/.test(user.email)) errors.email = 'Email is invalid';
    if (!user.department) errors.department = 'Department is required';
    return errors;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      const newUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        department: user.department,
      };

      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      addUser({ ...response.data, ...newUser });
      setUser(initialFormState);
      setShowAddForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {error && <p>Error: {error}</p>}
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
          />
          {validationErrors.firstName && <p className="error">{validationErrors.firstName}</p>}

          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
          />
          {validationErrors.lastName && <p className="error">{validationErrors.lastName}</p>}

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          {validationErrors.email && <p className="error">{validationErrors.email}</p>}

          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={user.department}
            onChange={handleInputChange}
          />
          {validationErrors.department && <p className="error">{validationErrors.department}</p>}

          <button type="submit">Add User</button>
          <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
