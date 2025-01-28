import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [userType, setUserType] = useState('customer');  // State for user type (customer or admin)
    const [username, setUsername] = useState('');          // State for username
    const [password, setPassword] = useState('');          // State for password
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send only username, password, and userType for login
            const response = await axios.post('http://localhost:3008/login', {
                username, password, userType,
            });
            const data = response.data;

            // Check for token in the response and save it to local storage
            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate(userType === 'admin' ? '/admin' : '/customer');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="userType">Login as:</label>
                    <select 
                        id="userType" 
                        value={userType} 
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
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
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}

export default Login;

