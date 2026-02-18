import React, { useState } from 'react'
import '../styles/admin.css'
import { Link } from 'react-router-dom'
import {  FaChevronDown, FaChevronUp, FaEdit, FaFile, FaList, FaSearch, FaStar, FaThLarge, FaUsers } from 'react-icons/fa'

const AdminSidebar = () => {

  const [opneMenu, setopenMenu] = useState({
    category: false,
    food: false,
    orders: false
  })

  const toggleMenu = (menu) => {
    setopenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }))
  }
  return (
    <div className='bg-dark text-white sidebar'>
      <div className='text-center p-3 border-bottom'>
        <img src='/images/admin.png' width={100} className='img-fluid mb-2' alt='admin Logo' />
        <h5 className='mb-0'>Admin</h5>
      </div>

      <div className='list-group list-group-flush '>
        <Link className='list-group-item border-0 list-group-item-action bg-dark text-white'><FaThLarge className='icon-fix' /> dashboard
        </Link>
        <Link className='list-group-item border-0 list-group-item-action bg-dark text-white'><FaUsers className='icon-fix' /> Reg Users
        </Link>
        <button onClick={() => toggleMenu('category')} className='list-group-item border-0 list-group-item-action bg-dark text-white'>
          <FaEdit className='icon-fix' /> Food Category {opneMenu.category ? <FaChevronUp/>: <FaChevronDown/>}
        </button>
        {opneMenu.category && (
          <div className='ps-4'>
            <Link to='/add-category' className='list-group-item list-group-item-action border-0 bg-dark text-white'>
              Add Category
            </Link >
            <Link to='/manage-category' className='list-group-item list-group-item-action border-0  bg-dark text-white'>
              Manage Category
            </Link>
          </div>
        )}

        <button onClick={() => toggleMenu('food')} className='list-group-item  border-0 list-group-item-action bg-dark text-white'>
          <FaEdit className='icon-fix' /> Food Item {opneMenu.food ? <FaChevronUp/>: <FaChevronDown/>}
        </button>
        {opneMenu.food && (
          <div className='ps-4'>
            <Link to='/add-food' className='list-group-item list-group-item-action border-0  bg-dark text-white'>
              Add Food Item
            </Link >
            <Link to='/manage-food' className='list-group-item list-group-item-action border-0 bg-dark text-white'>
              Manage Food item
            </Link>
          </div>
        )}

        <button onClick={() => toggleMenu('orders')} className='list-group-item  border-0 list-group-item-action bg-dark text-white'>
          <FaList className='icon-fix' /> Food Orders {opneMenu.orders ? <FaChevronUp/>: <FaChevronDown/>}
        </button>
        {opneMenu.orders && (
          <div className='ps-4'>
            <Link className='list-group-item list-group-item-action border-0  bg-dark text-white'>
              Not Confirmed
            </Link >
            <Link className='list-group-item list-group-item-action border-0 bg-dark text-white'>
              Confirmend
            </Link>
            <Link className='list-group-item list-group-item-action border-0 bg-dark text-white'>
              Being Prepared
            </Link>
            <Link className='list-group-item list-group-item-action border-0 bg-dark text-white'>
              Food Delivered
            </Link>
            <Link className='list-group-item list-group-item-action border-0 bg-dark text-white'>
              Food Cancelled
            </Link>
            <Link className='list-group-item list-group-item-action border-0 bg-dark text-white'>
              All Orders
            </Link>
          </div>
        )}

         <Link className='list-group-item list-group-item-action bg-dark text-white border-0 '><FaFile className='icon-fix' /> B/w Dates Report</Link>
        <Link className='list-group-item list-group-item-action bg-dark text-white border-0 '><FaSearch className='icon-fix' /> Search</Link>
        <Link className='list-group-item list-group-item-action bg-dark text-white border-0 '><FaStar className='icon-fix' /> Manage Review</Link>

      </div>


    </div>
  )
}

export default AdminSidebar
