import React from 'react';
import {Link} from 'react-router-dom'
import './ErrorElement.scss'
import errorImg from '../../img/error.jpg'


function ErrorElement() {
    return (
      <div className="error-element container">
        <h3> oops! something went wrong</h3>
        <h1> 404 error</h1>
        <img src={errorImg} alt="errorImg"/>
      </div>
    );
  }
  
  export default ErrorElement;