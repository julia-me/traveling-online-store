import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'; 
import {Link} from 'react-router-dom'
import './Orders.scss'
import OrderItem from './OrderItem'

const mapStateToProps = store => {
    return {
        orders: store.orders,
    }
};

function Orders({orders}) {
  console.log(orders);

    return (
      <div className="order container">
        <h1 className='order-title'> History of company orders</h1>
        {orders.length ? orders.map( order =>{
          return <OrderItem order={order} key={order[3].id}/>
        }): null}
      </div>
    );
}
  
export default connect(mapStateToProps, null)(Orders);