
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import Customer from './components/Customer';
import Navbar from './components/Navbar';
import './App.css';
function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <h1>Welcome to the Bookstore</h1>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/customer" element={<Customer />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;