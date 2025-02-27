import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userAuth } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setUser, setToken} = userAuth();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/login', { email, password });
      console.log(res.data);
      toast.success("Login Successfull");

      console.log("myToken",res.data.token);
      localStorage.setItem('token',JSON.stringify(res.data.token));
      setToken(res.data.token);
      localStorage.setItem('user',JSON.stringify(res.data.user));
      setUser(res.data.user);  
      navigate('/');
    } catch (error) {
      toast.error("Login Failed");
      console.error('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-lg rounded-lg p-6 w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input type="email" placeholder="Email" className="border px-4 py-2 w-full mb-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="Password" className="border px-4 py-2 w-full mb-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
