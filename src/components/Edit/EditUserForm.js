import React, { useState, useEffect } from 'react';
import './EditUserForm.css';

const EditUserForm = ({ user, updateUser, setEditingUser }) => {
  const initialFormState = { firstName: '', lastName: '', email: '', department: '' };
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!currentUser.firstName) errors.firstName = 'First Name is required';
    if (!currentUser.lastName) errors.lastName = 'Last Name is required';
    if (!currentUser.email) errors.email = 'Email is required';
    if (currentUser.email && !/\S+@\S+\.\S+/.test(currentUser.email)) errors.email = 'Email is invalid';
    if (!currentUser.department) errors.department = 'Department is required';
    return errors;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    updateUser(currentUser.id, currentUser);
    setEditingUser(null);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={currentUser.firstName}
            onChange={handleInputChange}
          />
          {validationErrors.firstName && <p className="error">{validationErrors.firstName}</p>}

          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={currentUser.lastName}
            onChange={handleInputChange}
          />
          {validationErrors.lastName && <p className="error">{validationErrors.lastName}</p>}

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={currentUser.email}
            onChange={handleInputChange}
          />
          {validationErrors.email && <p className="error">{validationErrors.email}</p>}

          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={currentUser.department}
            onChange={handleInputChange}
          />
          {validationErrors.department && <p className="error">{validationErrors.department}</p>}

          <button type="submit">Update User</button>
          <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
