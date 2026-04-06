import React, { useEffect, useState } from 'react'
import { FaHome, FaPlus, FaSignInAlt, FaTruck, FaUserPlus, FaUserShield, FaUtensils } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'
import '../styles/home.css'

const Home = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {

    fetch(`http://127.0.0.1:8000/api/random_foods/`)
      .then(res => res.json())
      .then(data => {
        setFoods(data)
      })

  }, []);
  return (
    <PublicLayout>
      <section className=' hero py-5 text-center' style={{ backgroundImage: "url('/images/foodimage.jpg')" }}>
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "40px 20px", borderRadius: "10px" }}>
          <h1 className='display-4'> Quick & Hot Food, Delevered to You </h1>
          <p className='lead'>Craving Something tasty? Let's get it to your door</p>
          <form method="GET" action="/search" className='d-flex gap-2 mt-3 ' style={{ maxWidth: "600px", margin: '0 auto' }}>
            <input style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} className='form-control' type='text' name='q' placeholder='I would like to eat...' />
            <button style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} className='btn btn-warning px-4'>Search</button>
          </form>
        </div>
      </section>

      <section className='py-5'>
        <div className='container'>
          <h2 className='text-center mb-4'>Most Loved  Dishes This Month<span className='badge bg-danger ms-2'>Top Picks</span></h2>

          <div className='row mt-4'>
            {foods.length == 0 ? (<p className='text-center'>No Foods Found!</p>) : (
              foods.map((food, index) => (

                <div className='col-md-4 mb-4'>
                  <div className='card hover-effect'>
                    <img src={`http://127.0.0.1:8000${food.image}`} className='card-img-top' style={{ height: '180px' }} />
                    <div className='card-body'>
                      <h5 className='card-title'>
                        <Link> {food.item_name} </Link>
                      </h5>
                      <p className='card-text text-muted'>{food.item_description?.slice(0, 40)}... </p>
                      <div className='d-flex justify-content-between align-items-center'>
                        <span className='fw-bold' >Rs. {food.price}</span>
                        {food.is_available ? (
                          <Link to="#" className='btn btn-outline-primary btn-sm'><i className='fas fa-shopping-basket me-1'></i> Order Now</Link>
                        ) : (
                          <div title='This food iteam is not available right now.'>
                            <button className='btn btn-outline-secondary btn-sm'><i className='fas fa-times-circle me-1'></i> Currently Unavailable</button>
                          </div>
                        )}

                      </div>

                    </div>
                  </div>
                </div>
              ))
            )}


          </div>
        </div>

      </section>
      <section className='py-5 bg-dark text-white'>
        <div className='container text-center'>
          <h2>Ordering in 3 Simple Steps</h2>
          <div className='row mt-4'>
            <div className='col-md-4'>
              <h4>1. Pick a dish you love</h4>
              <p>Explore hundreds of mouth watering options and choose whay you crave!</p>
            </div>
            <div className='col-md-4'>
              <h4>2. Share your location</h4>
              <p>Tell us where you are, and we'll handle the rest.</p>
            </div>
            <div className='col-md-4'>
              <h4>3. Enjoy Doorstep Delivery</h4>
              <p>Relax while your meal arrives fast and fresh - pay when it's delivered!</p>
            </div>

          </div>
          <p>Pay easily with Cash on Delivery - hassel-free</p>



        </div>


      </section>


      <section className='py-5 bg-warning text-center text-dark'>
        <h4>Ready to Satify your hunger?</h4>
        <Link to="#" className='btn btn-dark btn-lg mt-4'>
        Browse Full Menu
        </Link>
      </section>


    </PublicLayout>

  )
}

export default Home
