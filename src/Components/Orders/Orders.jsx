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
      <div className="orders container">
        <h1> History of company orders</h1>
      </div>
    );
  }
  
export default connect(mapStateToProps, null)(Orders);