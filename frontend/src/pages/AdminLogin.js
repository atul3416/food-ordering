import React from 'react'
import { FaUser, FaLock , FaSignIn, FaSignInAlt } from 'react-icons/fa'
import '../styles/admin.css'
const AdminLogin = () => {
  return(
    <div className='d-flex justify-content-center vh-100 align-items-center' style={{backgroundImage:"url('/images/foodbg.jpg')",backgroundSize:'cover'}}>

    <div className='card p-4 shadow-lg ' style={{maxWidth:"400px", width:"100%"}}>
      <h4 className='text-center mb-4'> <FaUser className='me-2 icon-fix'/> AdminLogin</h4>

      <form>
        <div className='mb-3'>
          <label className='form-label'><FaUser className='me-1 icon-fix'/> UserName</label>
          <input type='text' className='form-control' placeholder='Enter Admin username' required/>  
        </div>

        <div className='mb-3'>
          <label className='form-label'><FaLock className='me-1 icon-fix'/> Password</label>
          <input type='password' className='form-control' placeholder='Enter password' required/>  
        </div>

        <button type='submit' className='btn btn-primary w-100 mt-3'>
          <FaSignInAlt className='m3-1 icon-fix'/> Login
        </button>

      </form>
    </div>
    </div>
  )
}

export default AdminLogin
