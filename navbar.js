// frontend/src/components/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const Navbar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="gradient-bg text-white fixed w-full z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-charging-station text-2xl"></i>
                        <Link to="/" className="text-xl font-bold">EV Charge</Link>
                    </div>
                    
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-blue-200 transition">Home</Link>
                        <Link to="/stations" className="hover:text-blue-200 transition">Stations</Link>
                        {user && (
                            <Link to="/bookings" className="hover:text-blue-200 transition">My Bookings</Link>
                        )}
                        <Link to="/about" className="hover:text-blue-200 transition">About</Link>
                    </div>

                    <div className="hidden md:flex space-x-4">
                        {user ? (
                            <>
                                <span className="text-white">{user.email}</span>
                                <button 
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-full glass-effect hover:bg-white hover:text-blue-600 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login"
                                    className="px-4 py-2 rounded-full glass-effect hover:bg-white hover:text-blue-600 transition"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register"
                                    className="px-4 py-2 rounded-full bg-white text-blue-600 hover:bg-blue-100 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    <button 
                        className="md:hidden text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 py-3 space-y-3">
                    <Link to="/" className="block hover:bg-blue-700 px-3 py-2 rounded-lg">Home</Link>
                    <Link to="/stations" className="block hover:bg-blue-700 px-3 py-2 rounded-lg">Stations</Link>
                    {user && (
                        <Link to="/bookings" className="block hover:bg-blue-700 px-3 py-2 rounded-lg">My Bookings</Link>
                    )}
                    <Link to="/about" className="block hover:bg-blue-700 px-3 py-2 rounded-lg">About</Link>
                    
                    {user ? (
                        <button 
                            onClick={handleLogout}
                            className="w-full text-left hover:bg-blue-700 px-3 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="space-y-2">
                            <Link to="/login" className="block hover:bg-blue-700 px-3 py-2 rounded-lg">Login</Link>
                            <Link to="/register" className="block hover:bg-blue-700 px-3 py-2 rounded-lg">Register</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
