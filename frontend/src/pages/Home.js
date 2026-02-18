import React from 'react'
import { FaHome, FaPlus, FaSignInAlt, FaTruck, FaUserPlus, FaUserShield, FaUtensils } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'

import '../styles/home.css'

const Home = () => {
  return (
    <PublicLayout>
      <section className=' hero py-5 text-center' style={{ backgroundImage: "url('/images/foodimage.jpg')" }}>
        <div  style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "40px 20px", borderRadius: "10px" }}>
          <h1 className='display-4'> Quick & Hot Food, Delevered to You </h1>
          <p className='lead'>Craving Something tasty? Let's get it to your door</p>
          <form method="GET" action="/search" className='d-flex gap-2 mt-3 ' style={{maxWidth:"600px", margin: '0 auto'}}>
            <input style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} className='form-control' type='text' name='q' placeholder='I would like to eat...' />
            <button style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} className='btn btn-warning px-4'>Search</button>
          </form>
        </div>
      </section>




    </PublicLayout>

  )
}

export default Home
