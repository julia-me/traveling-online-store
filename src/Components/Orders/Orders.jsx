import React from "react";
import { connect } from "react-redux";
import OrderItem from "./OrderItem";
import "./Orders.scss";

const mapStateToProps = store => {
  return {
    orders: store.orders
  };
};

function Orders({ orders }) {
  return (
    <div className="order container">
      <h1 className="order-title"> History of company orders</h1>
      {orders.length
        ? orders.map(order => {
            return <OrderItem order={order} key={order[3].id} />;
          })
        : null}
    </div>
  );
}

export default connect(
  mapStateToProps,
  null
)(Orders);
