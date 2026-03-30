import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

  const [formData, setFormData] = useState({fullname: '', email: '', password: ''});
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
   try{
     const res = await axios.post('/user/signup', formData);
     setIsError(false);
     setMessage(res.data.message);
     setFormData({fullname: '', email: '', password: ''});
    } catch(error){
      setIsError(true);
      setMessage(error.response?.data?.message || "Something went wrong");

    }
  }

 return (
  <>
    <form 
      onSubmit={handleSubmit} 
      className='bg-black bg-opacity-90 flex flex-col w-full max-w-[400px] m-auto mt-12 mb-20 p-6 items-center gap-6 rounded-xl shadow-2xl'
    >

      {/* Full Name */}
      <div className='flex flex-col w-full'>
        <label htmlFor="fullname" className='text-white text-lg mb-1'>
          Enter Your Full Name:
        </label>
        <input 
          id="fullname"
          type="text" 
          placeholder='Full Name' 
          name='fullname' 
          onChange={handleChange} 
          value={formData.fullname} 
          required 
          className='border border-gray-600 rounded-lg w-full h-10 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400'
        />
      </div>

      {/* Email */}
      <div className='flex flex-col w-full'>
        <label htmlFor="email" className='text-white text-lg mb-1'>
          Enter Your Email:
        </label>
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

      {/* Password */}
      <div className='flex flex-col w-full'>
        <label htmlFor="password" className='text-white text-lg mb-1'>
          Enter Password:
        </label>
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

      {/* Message */}
      {message && (
        <p className={isError ? "text-red-600" : "text-green-500"}>
          {message}
        </p>
      )}

      {/* Button */}
      <div className='flex flex-row gap-4 w-full'>
        <button 
          type="submit"
          className='bg-yellow-600 text-black py-2 rounded-lg font-bold w-full hover:bg-yellow-500 transition-all duration-300 mt-6'
        >
          Sign Up
        </button>
      </div>

      {/* Redirect */}
      <p className='text-white text-sm'>
        Already have an account?{" "}
        <NavLink to='/login' className='text-yellow-500 underline'>
          Login
        </NavLink>
      </p>

    </form>
  </>
)
}

export default SignUp
