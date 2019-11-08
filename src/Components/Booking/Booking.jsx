import React , {useState} from 'react';
import { connect } from 'react-redux'; 
import {useHistory} from 'react-router-dom';
import {addOrder} from '../../actions/actions'
import './Booking.scss'

const mapStateToProps = store => {
  return {
    cartTours: store.cartTours,
    loginUser: store.loginUser
  }
};

const matchDispatchToProps = dispatch => {
  return {
    addOrder: (order) => {
      dispatch(addOrder(order));
    }
  }
};

function Booking({loginUser, cartTours, addOrder}) {

    const [name, setName]= useState(loginUser.length ? loginUser[0].name : '');
    const [surname, setSurname]= useState(loginUser.length ? loginUser[0].surname : '');
    const [email, setEmail]= useState(loginUser.length ? loginUser[0].email : '');
    const [city, setCity]= useState(loginUser.length ? loginUser[0].city : '');
    const [tel, setTel]= useState(loginUser.length ? loginUser[0].telefone : +380);
    let telNumberString = tel.toString()
    let validNumber = telNumberString.length === 12 ? true : false;
    let history = useHistory()


    const finishBookingHendler =()=>{
      if(name && surname && email && city && validNumber){
        let userInfo = loginUser.length ? loginUser : [{name:name, surname: surname, email: email, city: city, tel: tel, }];
        let order = [[...userInfo],[...cartTours], {date: new Date().toLocaleString()}]
        addOrder(order)
        localStorage.setItem('lastOrder', JSON.stringify(order))
        history.push('/finishedBooking')
      }
    }

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
                  {!validNumber && <small id="emailHelp" className="form-text  error"> Phone number must contain 12 figures </small>}
              </div>
              <div className='booking-form-btn'>
              <button  onClick={finishBookingHendler}  type="button" className="btn btn-info">finish </button>
              </div>
          </div>
      </div>
    );
  }
  


  export default connect(mapStateToProps, matchDispatchToProps)(Booking);