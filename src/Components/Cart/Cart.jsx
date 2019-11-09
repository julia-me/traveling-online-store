import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../actions/actions";
import "./Cart.scss";

const mapStateToProps = store => {
  return {
    cartTours: store.cartTours
  };
};

const matchDispatchToProps = dispatch => {
  return {
    removeFromCart: removeTour => {
      dispatch(removeFromCart(removeTour));
    }
  };
};

function Login({ cartTours, removeFromCart }) {
  let summ = 0;
  cartTours.forEach(tour => {
    summ += tour.transportOption[0].price;
  });

  return (
    <div className="main container">
      <div className="cart">
        <h1 className="cart-title"> Your current order </h1>
        {cartTours.length
          ? cartTours.map(el => {
              return (
                <>
                  <div className="card" key={el.departureCity + new Date()}>
                    <p> {el.departureCity}</p>
                    <p> to: {el.arrivalCity}</p>
                    <p> {el.numberOfTrevellers} pers.</p>
                    <p> {el.transportOption[0].transport}</p>
                    <p> {el.transportOption[0].price} $.</p>
                    <p>
                      <svg
                        onClick={e => removeFromCart(el.id)}
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="minus-circle"
                        className="svg-inline--fa fa-minus-circle fa-w-16"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z"
                        ></path>
                      </svg>
                    </p>
                  </div>
                </>
              );
            })
          : null}
        {cartTours.length ? (
          <h3 className="cart-total-cost"> Total cost: {summ} $.</h3>
        ) : null}
        <div className="cart-buttons">
          {cartTours.length ? (
            <Link to="/booking" className="btn btn-outline-info">
              finish booking
            </Link>
          ) : null}
          <Link className="btn btn-outline-secondary" to="/">
            main page
          </Link>
        </div>
      </div>
    </div>
  );
}


export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Login);
