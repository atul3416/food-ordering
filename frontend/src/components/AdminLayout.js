import React, { useState, UseEffect, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import '../styles/admin.css'


const AdminLayout = ({ children }) => {
  const [sidebarOpen, setsidebarOpen] = useState(true);
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
        <AdminHeader toogleSidebar= {toogleSidebar} sidebarOpen={sidebarOpen} />

        <div className='container-fluid mt-4'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
