
import axios from 'axios';
import { useState } from 'react';

function Register() {
  const [username, setUsername] = useState("");  // State for username
  const [password, setPassword] = useState("");  // State for password
  const [role, setRole] = useState("user");  // State for role (user/admin)

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    try {
      const response = await axios.post('http://localhost:3008/register', {
        username,  // Send the username to the server
        password,  // Send the password to the server
        role,      // Send the role (user/admin)
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role: </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
