import React, { useState } from 'react'
import { FaUser, FaLock, FaSignIn, FaSignInAlt } from 'react-icons/fa'
import '../styles/admin.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/admin-login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.status === 200) {
      setTimeout(() => {
        toast.success(data.message)
        window.location.href = '/admin-dashboard';
      }, 2000)
    }
    else {
      toast.error(data.message);
    }
  }
  return (

    <div className='d-flex justify-content-center vh-100 align-items-center' style={{ backgroundImage: "url('/images/foodbg.jpg')", backgroundSize: 'cover' }}>

      <div className='card p-4 shadow-lg ' style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className='text-center mb-4'> <FaUser className='me-2 icon-fix' /> AdminLogin</h4>

        <form onSubmit={handleLogin}>
          <div className='mb-3'>
            <label className='form-label'><FaUser className='me-1 icon-fix' /> UserName</label>
            <input type='text' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Admin username' required />
          </div>

          <div className='mb-3'>
            <label className='form-label'><FaLock className='me-1 icon-fix' /> Password</label>
            <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' required />
          </div>

          <button type='submit' className='btn btn-primary w-100 mt-3'>
            <FaSignInAlt className='m3-1 icon-fix' /> Login
          </button>

        </form>
      </div>
      <ToastContainer autoClose={2000}  />
    </div>
  )
}

export default AdminLogin
