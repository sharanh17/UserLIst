import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserForm from '../AddUser/AddUserForm';
import EditUserForm from '../Edit/EditUserForm';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const mappedUsers = response.data.map(user => ({
          id: user.id,
          firstName: user.name.split(' ')[0], // Extract first name from the 'name' field
          lastName: user.name.split(' ')[1], // Extract last name from the 'name' field
          email: user.email,
          department: user.company ? user.company.name : 'N/A'
        }));
        setUsers(mappedUsers);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getNextUserId = () => {
    if (users.length === 0) return 1;
    const ids = users.map(user => user.id);
    return Math.max(...ids) + 1;
  };

  const addUser = newUser => {
    const updatedUser = { ...newUser, id: getNextUserId() };
    setUsers([...users, updatedUser]);
  };

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditingUser(null);
    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1>User List</h1>
      <button className="add-btn" onClick={() => setShowAddForm(true)}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button className="edit-btn" onClick={() => setEditingUser(user)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            style={{
              backgroundColor: currentPage === index + 1 ? '#007bff' : '#ccc',
              color: 'white',
              marginRight: '5px'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {showAddForm && <AddUserForm addUser={addUser} setShowAddForm={setShowAddForm} />}
      {editingUser && <EditUserForm user={editingUser} updateUser={updateUser} setEditingUser={setEditingUser} />}
    </div>
  );
};

export default UserList;
