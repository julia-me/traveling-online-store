import React from 'react';
import { connect } from 'react-redux'; 
import {Link} from 'react-router-dom'
import logo from '../../img/logo.jpg'
import cart from '../../img/shopping.png'
import './Header.scss'

const mapStateToProps = store => {
  return {
    user: store.loginUser,
  }
};



function Header({user}) {
  // const user = JSON.parse(localStorage.getItem('loginUser')) || []

  console.log(user)
  console.log(user.length)
    return (
      <div className="header container">
          <Link to="/" className="header-logo"> 
            <img src={logo} alt=""/>
          </Link> 
          <ul className="header-navigation"> 
              <li className="header-navigation-item"> <Link to="/"> Home </Link> </li>
              <li className="header-navigation-item"> <Link to="/about"> About us </Link> </li>
              <li className="header-navigation-item"> <Link to="/policy"> Policy </Link> </li>
              {user.length ? <li className="header-navigation-item"> <Link to="/favourite"> Favourite </Link> </li> : null}
          </ul>
          <div className="header-login">
            {!user.length ? <Link className="header-login-item" to="/login"> LogIn </Link> : <Link className="header-login-item" to="/logout"> log out </Link>  }
            {user.length ? <p> Welcome, {user[0].name}  </p> : null}
          </div>
          <div className="header-shopping-cart">
            <Link to="/cart"> 
              <img src={cart} alt=""/>
            </Link> 
          </div>
      </div>
    );
  }
  // export default Header
  export default connect(mapStateToProps, null)(Header);