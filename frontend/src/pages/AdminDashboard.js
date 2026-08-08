import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import '../styles/AdminDashboard.css'
const AdminDashboard = () => {
  const adminUser = localStorage.getItem('adminUser')
  const navigate = useNavigate();
  const [metrics, setMetrices] = useState(
    {
      totalOrders: 0,
      newOrders: 0,
      confirmOrders: 0,
      preparingOrders: 0,
      pickedOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
      totalUsers: 0,
      totalCategories: 0,
      todaySales: 0,
      weekSales: 0,
      monthSales: 0,
      yearSales: 0,
      totalReviews: 0,
      totalWishlists: 0

    }
  )


  useEffect(() => {
    if (!adminUser) {
      navigate('/admin-login');
      return;
    }
    fetch('http://127.0.0.1:8000/api/dashboard-metrics/')
      .then(res => res.json())
      .then(data => {
        setMetrices(data)
      })
  }, []);

  const cardData = [
    { title: 'Total Orders', key: 'totalOrders', color: 'primary', icon: 'fas fa-shopping-cart' },
    { title: 'New Orders', key: 'newOrders', color: 'secondary', icon: 'fas fa-cart-plus' },
    { title: 'Confirmed Orders', key: 'confirmOrders', color: 'info', icon: 'fas fa-check-circle' },
    { title: 'InProcess Orders', key: 'preparingOrders', color: 'warning', icon: 'fas fa-utensils' },
    { title: 'Picked Orders', key: 'pickedOrders', color: 'dark', icon: 'fas fa-motorcycle' },
    { title: 'Delivered Orders', key: 'deliveredOrders', color: 'info', icon: 'fas fa-truck' },
    { title: 'Cancelled Orders', key: 'cancelledOrders', color: 'secondary', icon: 'fas fa-time-circle' },
    { title: 'Total Users', key: 'totalUsers', color: 'danger', icon: 'fas fa-users' },
    { title: 'Today\'s Sale', key: 'todaySales', color: 'danger', icon: 'fas fa-coins' },
    { title: 'This Week\'s Sale', key: 'weekSales', color: 'secondary', icon: 'fas fa-calendar-week' },
    { title: 'Month Sale', key: 'monthSales', color: 'primary', icon: 'fas fa-calendar-alt' },
    { title: 'This Year\'s Sale', key: 'yearSales', color: 'secondary', icon: 'fas fa-calendar-alt' },
    { title: 'Total Category', key: 'totalCategories', color: 'secondary', icon: 'fas fa-shopping-cart' },
    { title: 'Total Review', key: 'totalReviews', color: 'warning', icon: 'fas fa-start' },
    { title: 'Total Wishlists', key: 'totalWishlists', color: 'primary', icon: 'fas fa-heart' },

  ]
  return (

    <AdminLayout>

      <div className='mb-4'>
        <h2>AdminDashboard
        </h2>
        <div className='row g-3'>
          {cardData.map((item, index) => (
            <div className='col-md-3' key={index}>
              <div className={`card card-hover text-white bg-${item.color}`}>
                <div className='card-body d-flex justify-content-between align-items-center'>
                  <div>
                    <h5 className='card-title'>{item.title}</h5>
                    <h2>{(item.title.includes('Sale')) ? `₹ ${metrics[item.key]}` : metrics[item.key]}</h2>
                  </div>
                  <i className={`${item.icon}`}></i>
                </div>

              </div>
            </div>
          ))}

           <div className='col-md-3'>
              <div className="card text-white bg-light">
                <div className='card-body d-flex justify-content-between align-items-center'>
                  <i className="fas fa-concierge-bell fa-2x text-danger"></i>
                  <p className='text-dark fw-bold text-center '>Food Ordering System</p>
                </div>

              </div>
            </div>
        </div>
      </div>

    </AdminLayout>

  )
}

export default AdminDashboard
