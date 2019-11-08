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
          <div className="login">
            <h1> do you really want to logout? </h1> 

            <Link className="header-login-item" to="/"> no! back to main page </Link> 
            <Link className="header-login-item" to="/" onClick={LogoutHendler}> yes! </Link> 

          </div>
      </div>
    );
  }

  
export default connect(null, matchDispatchToProps)(Logout);

// export default Logout;