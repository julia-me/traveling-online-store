import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromFavourite } from "../../actions/actions";
import "./Favourite.scss";

const matchDispatchToProps = dispatch => {
  return {
    removeFromFavourite: deleteTour => {
      dispatch(removeFromFavourite(deleteTour));
    }
  };
};

const mapStateToProps = store => {
  return {
    allUsers: store.users,
    loginUser: store.loginUser
  };
};

function Favourite({ allUsers, removeFromFavourite, loginUser }) {
  let favArr = [];
  allUsers.map(el => {
    if (el[0].id === loginUser[0].id) {
      return (favArr = [...el[1]]);
    }
  });
  return (
    <div className=" favourite container">
      {favArr.length ? (
        <h1> Your favourite tours </h1>
      ) : (
        <h1> You don't have favourite tours yet </h1>
      )}
      <div className="row favourite-content">
        {favArr.map(tour => {
          let start = tour.startDay.slice(0, 10);
          let end = tour.endDay.slice(0, 10);
          return (
            <div
              key={tour.arrivalCountry + tour.arrivalCity+ tour.startDay}
              className="col-6 col-md-4 tour-card-wrapper"
            >
              <div className="favourite-item ">
                <div className="favourite-item-delete">
                  <svg
                    onClick={e => removeFromFavourite(tour.id)}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="trash"
                    className="svg-inline--fa fa-trash fa-w-14"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                    ></path>
                  </svg>
                </div>
                <h2> {tour.arrivalCountry}</h2>
                <h3> {tour.arrivalCity}</h3>
                <h5> departure from: {tour.departureCity}</h5>
                <div className="tour-item-city-img">
                  <img src={tour.mainImg} alt="" className="tour-item-img" />
                </div>
                <p>
                  from {start} to {end}
                </p>
                <p>
                  {(new Date(end) - new Date(start)) / (24 * 60 * 60 * 1000)}
                  days tour
                </p>
                <p> tour for {tour.numberOfTrevellers} person</p>
                <div className="tour-item-back-more">
                  <Link
                    onClick={e =>
                      localStorage.setItem("Tour", JSON.stringify(tour))
                    }
                    to={{ pathname: `/tour/${tour.id}` }}
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="angle-double-right"
                      className="svg-inline--fa fa-angle-double-right fa-w-14"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
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
)(Favourite);
