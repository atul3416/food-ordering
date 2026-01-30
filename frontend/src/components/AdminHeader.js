import React from 'react'
import { FaBell, FaSignOutAlt } from 'react-icons/fa'

const AdminHeader = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
                <div class="container-fluid">
                    <a class="navbar-brand " href="#"><i className='fas fa-utensils'></i> Food Ordering System</a>
                    <button class="navbar-toggler border-0">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className='collapse navbar-collapse'>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-item-center gap-2">
                            <li className="nav-item">
                                <button className='btn btn-outline-secondary '>
                                    <FaBell />
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className='btn btn-outline-danger '>
                                    <FaSignOutAlt className='me-1' /> Logout
                                </button>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AdminHeader
