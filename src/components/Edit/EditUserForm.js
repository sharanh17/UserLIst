// EditUserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserForm = ({ user, updateUser, setEditingUser }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${currentUser.id}`, currentUser);
      updateUser(currentUser.id, currentUser);
      setEditingUser(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="firstName" value={currentUser.firstName} onChange={handleInputChange} />
        <label>Last Name:</label>
        <input type="text" name="lastName" value={currentUser.lastName} onChange={handleInputChange} />
        <label>Email:</label>
        <input type="email" name="email" value={currentUser.email} onChange={handleInputChange} />
        <label>Department:</label>
        <input type="text" name="department" value={currentUser.department} onChange={handleInputChange} />
        <button type="submit">Update User</button>
        <button onClick={() => setEditingUser(null)}>Cancel</button>
      </form>
    </div>
  );
};

export default EditUserForm;
