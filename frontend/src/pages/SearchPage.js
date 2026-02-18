import React, { useState, useEffect } from 'react'
import PublicLayout from '../components/PublicLayout'
import { Link } from 'react-router-dom'
import '../styles/home.css'
const SearchPage = () => {
    return (
        <PublicLayout>
            <div className='container py-3 '>
                <h3 className='text-center'>Results for: burger </h3>
                <div className='row mt-4'>

                    <div className='col-md-4 mb-4'>
                        <div className='card hover-effect'>
                            <img src='/images/foodbg.jpg' className='card-img-top' style={{ height: '180px' }} />
                            <div className='card-body'>
                                <h5 className='card-title'>
                                    <Link> Burger </Link>
                                </h5>
                                <p className='card-text text-muted'>Best fast food </p>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span className='fw-bold' >Rs. 100</span>
                                    <Link to="#" className='btn btn-outline-primary btn-sm'><i className='fas fa-shopping-basket me-1'></i> Order Now</Link>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </PublicLayout>
    )
}

export default SearchPage
