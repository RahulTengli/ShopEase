import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    try {
      const response = await axios.post('http://localhost:4000/api/register', { username, email, password });
      console.log(response);
      toast.success(response.message);
      
      navigate('/login');
    } catch (error) {
      console.error('Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-lg rounded-lg p-6 w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        <input type="name" placeholder="Name" className="border px-4 py-2 w-full mb-2 rounded" value={username} onChange={(e) => setName(e.target.value)} required />

        <input type="email" placeholder="Email" className="border px-4 py-2 w-full mb-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="Password" className="border px-4 py-2 w-full mb-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-700">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Register;
