import React from 'react';
import { connect } from 'react-redux'; 
import {Link} from 'react-router-dom';
import './Login.scss';
import { logoutUser, clearCart } from '../../actions/actions'


const matchDispatchToProps = dispatch => {
  return {
    logoutUser: (arr) => {
      dispatch(logoutUser(arr));
    },
    clearCart: () => {
      dispatch(clearCart());
    }
  }
};

function Logout({logoutUser, clearCart}) {

  const LogoutHendler =()=> {
    logoutUser([])
    clearCart()
    // localStorage.setItem('loginUser', JSON.stringify([]))
  }

    return (
      <div className="main container">
          <div className="logout">
            <h1> do you really want to logout? </h1> 
            <div className='logout-buttons'> 
            <Link className="btn btn-success" to="/">  no! back to main page </Link> 
            <Link className="btn btn-warning" to="/" onClick={LogoutHendler}> yes! I really want </Link> 
            </div>

          </div>
      </div>
    );
  }

  
export default connect(null, matchDispatchToProps)(Logout);

// export default Logout;