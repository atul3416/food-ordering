import React, { useEffect, useState } from 'react'
import { FaCogs, FaHeart, FaHome, FaPlus, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaTruck, FaUser, FaUserCircle, FaUserPlus, FaUserShield, FaUtensils } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/layout.css'

const PublicLayout = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const uName = localStorage.getItem("userName");

  useEffect(() => {
    if (userId) {
      setLoggedIn(true);
      setUserName(uName);
    }
  }, [userId])

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setLoggedIn(false);
    navigate("/login");
  }

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
                <Link className="nav-link " to="/"><FaHome className='me-1' /> Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#"><FaUtensils className='me-1' /> Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#"><FaTruck className='me-1' /> Track</Link>
              </li>

              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register"><FaUserPlus className='me-1' /> Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login"><FaSignInAlt className='me-1' /> Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-login"><FaUserShield className='me-1' /> Admin Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-login"><FaUser className='me-1' /> My Orders</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-login"><FaShoppingCart className='me-1' /> Cart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-login"><FaHeart className='me-1' /> Wishlist</Link>
                  </li>

                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                     <FaUserCircle className='me-1'/> {uName}
                    </a>
                    <ul class="dropdown-menu">
                      <li><Link class="dropdown-item" ><FaUser className='me-1'/>Profile</Link></li>
                      <li><Link class="dropdown-item" ><FaCogs className='me-1'/>Settings</Link></li>
                      <li><hr class="dropdown-divider"/></li>
                      <li><button class="dropdown-item" onClick={handleLogout} ><FaSignOutAlt className='me-1'/>Logout</button></li>
                    </ul>
                  </li>

                </>
              )}


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
