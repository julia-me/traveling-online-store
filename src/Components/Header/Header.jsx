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

    return (
      <>
        {user.length &&  user[0].isAdmin  ? 
        <div className="header-top">
          <div className='container'>
            <h1> Hi, {user[0].name}. You logined as Administrator </h1>
          </div>
        </div>
        : null
        }
      <div className="header container">
          <Link to="/" className="header-logo"> 
            <img src={logo} alt=""/>
          </Link> 
          <ul className="header-navigation"> 
              <li className="header-navigation-item"> <Link to="/"> Home </Link> </li>
              <li className="header-navigation-item"> <Link to="/about"> About us </Link> </li>
              {user.length && !user[0].isAdmin ? <li className="header-navigation-item"> <Link to="/favourite"> Favourite </Link> </li> : null}
              {user.length && user[0].isAdmin  ?
              <>
              <li className="header-navigation-item"> <Link to="/create"> Create tour </Link> </li> 
              <li className="header-navigation-item"> <Link to="/orders">  Orders </Link> </li> 
              </> 
              : null
              }
          </ul>
          <div className="header-login">
            {!user.length ? <Link className="header-login-item" to="/login"> LogIn </Link> : <Link className="header-login-item" to="/logout"> log out </Link>  }
          </div>
          <div className="header-login">
            {user.length && !user[0].isAdmin ? <p className='header-login-name'> Welcome, {user[0].name}  </p> : null}
          </div>
          <div className="header-shopping-cart">
            <Link to="/cart"> 
              <img src={cart} alt=""/>
            </Link> 
          </div> 
      </div>
      </>
    );
  }
  // export default Header
  export default connect(mapStateToProps, null)(Header);