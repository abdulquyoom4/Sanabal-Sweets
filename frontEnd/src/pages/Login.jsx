import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({email: '', password: ''});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    }); 
  }

   const handleSubmit = async (e) =>{
      e.preventDefault();
     try{
       const res = await axios.post('/user/login', formData);
       setIsError(false);
       setMessage(res.data.message);
      window.dispatchEvent(new Event("authChange"));
         if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
       setFormData({email: '', password: ''});
      } catch(error){
        setIsError(true);
       setMessage(error.response.data.message);
      }
    }


  return (
   <>
   
  <form onSubmit={handleSubmit} className='bg-black bg-opacity-90 flex flex-col w-full max-w-[400px] m-auto mt-12 mb-20 p-6 items-center gap-6 rounded-xl shadow-2xl'>
  <div className='flex flex-col w-full'>
    <label htmlFor="email" className='text-white text-lg mb-1'>Enter Your Email:</label>
    <input 
      id="email"
      type="email" 
      placeholder='Email' 
      name='email' 
      onChange={handleChange} 
      value={formData.email} 
      required 
      className='border border-gray-600 rounded-lg w-full h-10 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400'
    />
  </div>
  <div className='flex flex-col w-full'>
    <label htmlFor="password" className='text-white text-lg mb-1'>Enter Password:</label>
    <input 
      id="password"
      type="password" 
      placeholder='Password' 
      name='password' 
      onChange={handleChange} 
      value={formData.password} 
      required
      className='border border-gray-600 rounded-lg w-full h-10 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400'
    />
  </div>
  {message && <p className={isError? "text-red-600" : "text-green-500"}>{message}</p>}
  <div className='flex flex-row gap-4 w-full'>
      <button className='bg-yellow-600 text-black py-2 rounded-lg font-bold w-full md:w-full hover:bg-yellow-500 transition-all duration-300 mt-10'>Login</button>
  </div>
  <p className='text-white text-sm'>New to Sanabel Sweets? <NavLink to='/signup' className='text-yellow-500 underline'>Sign Up</NavLink></p>
</form>
   </>
  ) 
}

export default Login
