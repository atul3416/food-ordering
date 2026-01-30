import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import '../styles/admin.css'

const AdminLayout = ({children}) => {
  return (
    <div className='d-flex'>
      <AdminSidebar/>

      <div id='page-content-wrapper' >
        <AdminHeader/>

        <div className='container-fluid mt-4'>
            {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
