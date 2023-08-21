import React from 'react';
import Logo2 from "../assets/logo2.jpg"
import { Button } from 'react-scroll';
import  { useState } from 'react';
import axios from 'axios';

import './Admin.css';


function Admin() {
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put('/api/users', { email, department });
      // Show success message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='admin-panel'>
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Department:
        <select value={department} onChange={(event) => setDepartment(event.target.value)}>
          <option value="">Select department</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Chemical Engineering">Chemical Engineering</option>
          <option value="Biomedical Engineering">Biomedical Engineering</option>
          <option value="Materials Science and Engineering">Materials Science and Engineering</option>
        </select>
      </label>
      <button type="submit">Update</button>
    </form>
    </div>
  );



}

export default Admin;
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.get('/api/user', { headers: { Authorization: `Bearer ${token}` } })
//         .then(response => setUser(response.data))
//         .catch(error => console.error(error));
//     }
//   }, []);

//  return (
  
//   <div>
//   {user ? (
//     <div>
//       <h1>Welcome, {user.fullName}!</h1>
//       <p>Age: {user.age}</p>
//     </div>
//   ) : (
//     <p>Please log in to see your information.</p>
//   )}
// </div>
// );
