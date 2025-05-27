import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
        alert('Login Successfully'); 
      localStorage.setItem('isAdmin', 'true'); 
      navigate('/admin'); 
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-xl font-bold text-center text-green-600 mb-1">Cloths Admin</h1>
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border border-gray-300 mb-4 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-green-600 text-white w-full p-2 rounded shadow-md hover:bg-green-700 shadow-green-500/50"
        >
          Login
        </button>
      </div>
    </div>
  );
}
