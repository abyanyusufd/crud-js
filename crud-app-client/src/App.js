import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    console.log('Fetching users');
    axios.get('http://localhost:3001/api/users')
      .then(res => {
        console.log('Users fetched:', res.data);
        setUsers(res.data);
      })
      .catch(err => console.error(err));
  };

  const deleteUser = (id) => {
    console.log('Deleting user with id:', id);
    axios.delete(`http://localhost:3001/api/users/${id}`)
      .then(() => fetchUsers())
      .catch(err => console.error(err));
  };

  const editUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container">
      <h1 className="mt-5">CRUD App</h1>
      <UserForm selectedUser={selectedUser} fetchUsers={fetchUsers} />
      <UserList users={users} deleteUser={deleteUser} editUser={editUser} />
    </div>
  );
};

export default App;
