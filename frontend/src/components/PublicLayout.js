import React from 'react'
import { FaHome, FaPlus, FaSignInAlt, FaTruck, FaUserPlus, FaUserShield, FaUtensils } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../styles/layout.css'
const PublicLayout = ({children}) => {
  return (
    <div>
      

      <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: "rgba(11, 4, 4, 0.76)" }}>
              <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="#"><FaUtensils className='me-2' /> Food Ordering System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-auto  ">
                    <li className="nav-item mx-1">
                      <Link className="nav-link " to="/"><FaHome className='me-1'/> Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="#"><FaUtensils className='me-1'/> Menu</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="#"><FaTruck className='me-1'/> Track</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="#"><FaUserPlus className='me-1'/> Register</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="#"><FaSignInAlt className='me-1' /> Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin-login"><FaUserShield className='me-1'/> Admin Login</Link>
                    </li>
                  </ul>
      
                </div>
              </div>
            </nav>
      
            <div>{children}</div>
            <footer className='text-center py-3 mt-5'>
              <div className='container'>
                <p className=''> &copy; 2025 Food Ordering System. All rights reserver </p>
      
              </div>
            </footer> 
    </div>
  )
}

export default PublicLayout
