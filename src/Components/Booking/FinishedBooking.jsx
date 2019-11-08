import React , {useState} from 'react';
import { connect } from 'react-redux'; 
import {Link} from 'react-router-dom';
import {addOrder, clearCart} from '../../actions/actions'
import './Booking.scss'


const matchDispatchToProps = dispatch => {
  return {
    // addOrder: (order) => {
    //   dispatch(addOrder(order));
    // }
    clearCart: () => {
        dispatch(clearCart());
    }
  }
};

function FinishedBooking({clearCart}) {
    const orders = JSON.parse(localStorage.getItem('lastOrder')) || [];
    let userInfo=[...orders[0]];
    let tourInfo = [...orders[1]];
    let userName = userInfo[0].name[0].toUpperCase() + userInfo[0].name.slice(1)
    console.log(tourInfo)

    let totalCost =0;
    tourInfo.map(el=> {
        totalCost+= el.transportOption[0].price
    });

    const finishBookingHendler =()=>{
        clearCart()
    }

    return (
      <div className="booking container">
          <h1> Thanks for your booking, {userName} </h1>
          <h4> Main tour info: </h4>
          <h3> You ordered {tourInfo.length} tour ps. </h3>
          {tourInfo.map( tour =>{
              return(
                  <p className='booking-text'>  From {tour.departureCity} ({tour.startDay}) to {tour.arrivalCity} ({tour.endDay}). You chose to travel by {tour.transportOption[0].transport}. </p>
              )
          })}
          <div className='booking-total-info'>
            <h4> Total cost: {totalCost} $.</h4>
            <h4> Our traveling manager will call you in 10 minutes. </h4>
          </div>

          <Link to="/" onClick={clearCart} className='btn-main' > bact to main page</Link>

      </div>
    );
  }
  


  export default connect(null, matchDispatchToProps)(FinishedBooking);