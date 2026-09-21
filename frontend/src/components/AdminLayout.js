import React, { useState, UseEffect, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import '../styles/admin.css'


const AdminLayout = ({ children }) => {
  const [sidebarOpen, setsidebarOpen] = useState(true);
  const [newOrders, setNewOrders] = useState(0);



  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dashboard-metrics/')
      .then(res => res.json())
      .then(data => {
        setNewOrders(data.newOrders )
      })
  }, []);




  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setsidebarOpen(false);
      }
      else {
        setsidebarOpen(true);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)
  }, []);

  const toogleSidebar = () => setsidebarOpen(prev => !prev);
  return (
    <div className='d-flex'>
      {sidebarOpen && <AdminSidebar />}

      <div id='page-content-wrapper' className={`flex-grow-1 ${sidebarOpen ? 'width-sidebar' : 'full-width'}`}>
        <AdminHeader new_order = {newOrders} toogleSidebar={toogleSidebar} sidebarOpen={sidebarOpen} />

        <div className='container-fluid mt-4'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
