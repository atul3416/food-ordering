import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { Link, useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv';
import { toast, ToastContainer } from 'react-toastify';

const ManageUsers = () => {
    const [Users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();
    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
        fetch('http://127.0.0.1:8000/api/users/')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
                setAllUsers(data)
            })
    }, []);

    const handleSearch = (s) => {
        const keyword = s.toLowerCase();
        if (!keyword) {
            setUsers(allUsers)
        }
        else {

            const filtered = allUsers.filter((c) => c.first_name.toLowerCase().includes(keyword) || c.last_name.toLowerCase().includes(keyword) || c.email.toLowerCase().includes());
            setUsers(filtered);
        }
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            fetch(`http://127.0.0.1:8000/api/delete_user/${id}/`, {
                method: 'DELETE',

            })
                .then(res => res.json())
                .then(data => {
                    toast.success(data.message);
                    setUsers(Users.filter(us => us.id !== id))
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <div>
            <AdminLayout>

                <div>
                    <h3 className='text-center text-primary mb-4'><i className='fas fa-list-alt me-1'></i>Users List</h3>
                    <h5 className='text-end text-mutate'>
                        <i className='fas fa-database me-1'></i>Total Users
                        <span className='ms-2 badge bg-success'> {Users.length}
                        </span></h5>

                    <div className='mb-4 d-flex justify-content-between'>
                        <input type='text' className='form-control w-50' placeholder='Search by  Name/Email...' onChange={(e) => { handleSearch(e.target.value) }} />
                        <CSVLink data={Users} className='btn btn-success ' filename={"category_list.csv"}>
                            <i className='fas fa-file-csv me-1'></i> Export to CSV
                        </CSVLink>
                    </div>
                    <table className='table table-bordered table-hover table-striped'>
                        <thead className='table-dark'>
                            <tr>
                                <th>S.No</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Users.map((u, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{u.first_name}</td>
                                    <td>{u.last_name}</td>
                                    <td>{u.mobile}</td>
                                    <td>{u.email}</td>
                                    <td>
 
                                        <button onClick={() => handleDelete(u.id)} className='btn btn-sm btn-danger'><i className='fas fa-trash-alt'></i>Delete</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <ToastContainer autoClose={2000} />
            </AdminLayout>
        </div>
    )
}

export default ManageUsers
