import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../login.css';  // Import the App.css for styling

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            console.log('Login response:', response.data);

            if (response.data.access_token) {
                const token = response.data.access_token;
                const store_user = {
                    token: token,
                    user_id: response.data.user_id,
                    username: username
                }
                localStorage.setItem('user', JSON.stringify(store_user));
                onLogin(username);
                navigate('/chat');
            } else {
                setError('Invalid login response');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
