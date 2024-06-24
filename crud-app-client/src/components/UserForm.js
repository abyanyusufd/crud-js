import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ selectedUser, fetchUsers }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    gender: 'Male'
  });

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    } else {
      setUser({ name: '', email: '', gender: 'Male' });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting user:', user);
    if (selectedUser) {
      axios.put(`http://localhost:3001/api/users/${selectedUser.id}`, user)
        .then(() => {
          fetchUsers();
          setUser({ name: '', email: '', gender: 'Male' });
        })
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost:3001/api/users', user)
        .then(() => {
          fetchUsers();
          setUser({ name: '', email: '', gender: 'Male' });
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select name="gender" value={user.gender} onChange={handleChange} className="form-control" required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select><br></br>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default UserForm;
