import React from 'react';
import { connect } from 'react-redux'; 
import {Link} from 'react-router-dom'
import './Orders.scss'


const mapStateToProps = store => {
    return {
        orders: store.orders,
    }
};

function Orders({orders}) {
    console.log(orders)
    return (
      <div className="order container">
        <h1 className='order-title'> History of company orders</h1>
        {orders.length ? orders.map( order =>{
          let userInfo = [...order[0]]
          let toursArr = [...order[1]]
          return(
            <div className='order-item' key={order[2].date+userInfo[0].login}>
              <div className='order-item-date'>
                <p> {order[2].date} </p>
              </div>
              <div className='order-item-user'> 
                <p> Customer info: {userInfo[0].name} {userInfo[0].surname},  tel: <a href="tel:+">{+userInfo[0].telefone}</a> , email: <a href="mailto:">{userInfo[0].email}</a>. City: {userInfo[0].city} </p>
              </div>
              <div className='order-item-tours'> 
              {toursArr.map(tour =>{
                let duration = (new Date(tour.endDay) - new Date(tour.startDay))/(24*60*60*1000)
                console.log(tour)
                return(
                  <div className='order-item-tours-item' key={order[2].date+ tour.departureCity}>
                      <p> {tour.departureCity} - {tour.arrivalCity} </p>
                      <p> {tour.startDay} - {tour.endDay} ({duration} days) </p>
                      <p> {tour.transportOption[0].transport} </p>
                      <p> {tour.transportOption[0].price} $ </p>
                  </div>
                )
              })}
              </div>
            </div>
          )
        }): null}
      </div>
    );
}
  
export default connect(mapStateToProps, null)(Orders);