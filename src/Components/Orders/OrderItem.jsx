import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeOrderStatus } from "../../actions/actions";
import "./Orders.scss";

const mapStateToProps = store => {
  return {
    orders: store.orders
  };
};

const matchDispatchToProps = dispatch => {
  return {
    changeOrderStatus: oderStatus => {
      dispatch(changeOrderStatus(oderStatus));
    }
  };
};

function OrderItem({ order, changeOrderStatus, orders }) {
  const [orderDecoration, setOrderDecaration] = useState("order-item");
  let userInfo = [...order[0]];
  let toursArr = [...order[1]];
  let status = order[3];
  const [paid, setPaid] = useState(false);
  const [reject, setReject] = useState(false);

  const itemDecoration = () => {
    let tourInfo = orders.find(order => order[3].id === status.id);
    switch (tourInfo[3].bookingStatus) {
      case "consideration":
        setReject(false);
        return setOrderDecaration("order-item consideration");

      case "paid":
        setPaid(true);
        return setOrderDecaration("order-item paid");

      case "reject":
        setReject(true);
        return setOrderDecaration("order-item rejected");

      default:
        return setOrderDecaration("order-item");
    }
  };

  useEffect(() => {
    itemDecoration();
  }, []);

  const chengeOrderStatusHendler = newStatus => {
    changeOrderStatus({
      id: status.id,
      bookingStatus: newStatus
    });
    itemDecoration();
  };

  return (
    <div className={orderDecoration} key={order[2].date + userInfo[0].login}>
      <div className="order-item-date">
        <p> {order[2].date} </p>
        {!paid && (
          <div>
            {!reject && (
              <button
                className="btn-main"
                onClick={e => chengeOrderStatusHendler("paid")}
              >
                paid for by
              </button>
            )}
            {!reject && (
              <button
                className="btn-main"
                onClick={e => chengeOrderStatusHendler("reject")}
              >
                rejected
              </button>
            )}
            <button
              className="btn-main"
              onClick={e => chengeOrderStatusHendler("consideration")}
            >
              consideration
            </button>
          </div>
        )}
      </div>
      <div className="order-item-user">
        <p>
          Customer info: {userInfo[0].name} {userInfo[0].surname}, tel:
          <a href="tel:+">{+userInfo[0].telefone}</a> , email:
          <a href="mailto:">{userInfo[0].email}</a>. City: {userInfo[0].city}
        </p>
      </div>
      <div className="order-item-tours">
        {toursArr.map(tour => {
          let duration =
            (new Date(tour.endDay) - new Date(tour.startDay)) /
            (24 * 60 * 60 * 1000);
          return (
            <div
              className="order-item-tours-item"
              key={order[2].date + tour.departureCity}
            >
              <p>
                {tour.departureCity} - {tour.arrivalCity}
              </p>
              <p>
                {tour.startDay} - {tour.endDay} ({duration} days)
              </p>
              <p> {tour.transportOption[0].transport} </p>
              <p> {tour.transportOption[0].price} $ </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(OrderItem);
