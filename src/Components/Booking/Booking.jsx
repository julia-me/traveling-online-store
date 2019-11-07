import React , {useState} from 'react';
import { connect } from 'react-redux'; 
import {Link} from 'react-router-dom';
import {removeFromCart} from '../../actions/actions'
import './Booking.scss'

const mapStateToProps = store => {
  return {
    cartTours: store.cartTours,
    loginUser: store.loginUser
  }
};

const matchDispatchToProps = dispatch => {
  return {
    removeFromCart: (removeTour) => {
      dispatch(removeFromCart(removeTour));
    }
  }
};

function Booking({loginUser, cartTours}) {

    const [name, setName]= useState(loginUser.length ? loginUser[0].name : '');
    const [surname, setSurname]= useState(loginUser.length ? loginUser[0].surname : '');
    const [email, setEmail]= useState(loginUser.length ? loginUser[0].email : '');
    const [city, setCity]= useState(loginUser.length ? loginUser[0].city : '');
    const [tel, setTel]= useState(loginUser.length ? loginUser[0].telefone : +380);

    return (
      <div className="booking container">
          <h1> Booking almost ready. We need your contact information </h1>
          <div className='booking-form'>
              <div className='form-group'>
                  <label htmlFor="name"> Name </label>
                  <input onChange={(e)=> setName(e.target.value)} type="text" id="name" className='form-control' value={name} placeholder='name' />
              </div>
              <div className='form-group'>
                  <label htmlFor="surname"> Surname </label>
                  <input onChange={(e)=> setSurname(e.target.value)} type="text" id="surname" className='form-control'value={surname}  placeholder='surname' />
              </div>
              <div className='form-group'>
                  <label htmlFor="email"> Email </label>
                  <input onChange={(e)=> setEmail(e.target.value)} type="email" id="email" className='form-control' value={email}  placeholder='email' />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className='form-group'>
                  <label htmlFor="city"> City </label>
                  <input onChange={(e)=> setCity(e.target.value)} type="text" id="city" className='form-control' value={city}  placeholder='city' />
              </div>
              <div className='form-group'>
                  <label htmlFor="tel"> Phone number </label>
                  <input onChange={(e)=> setTel(e.target.value)} type="number" id="tel" className='form-control' value={tel}  placeholder='Phone number' />
              </div>
              <div className='booking-form-btn'>
              <button type="button" className="btn btn-info">finish</button>
              </div>
          </div>
      </div>
    );
  }
  


  export default connect(mapStateToProps, matchDispatchToProps)(Booking);