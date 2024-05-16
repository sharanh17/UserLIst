// AddUserForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';

const AddUserForm = ({ addUser, setShowAddForm }) => {
  const initialFormState = { firstName: '', lastName: '', email: '', department: '' };
  const [user, setUser] = useState(initialFormState);
  const [error, setError] = useState(null);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
      addUser({ ...response.data, department: user.department });
      setUser(initialFormState);
      setShowAddForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="modal">
      {error && <p>Error: {error}</p>}
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" name="firstName" value={user.firstName} onChange={handleInputChange} />
          <label>Last Name:</label>
          <input type="text" name="lastName" value={user.lastName} onChange={handleInputChange} />
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleInputChange} />
          <label>Department:</label>
          <input type="text" name="department" value={user.department} onChange={handleInputChange} />
          <button type="submit">Add User</button>
          <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
