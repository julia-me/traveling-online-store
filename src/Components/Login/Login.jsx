import React, {useState} from 'react';
import { connect } from 'react-redux'; 
import {Link, useHistory} from 'react-router-dom';
import './Login.scss';
import dataUsers from '../../data/users';
import { loginUser } from '../../actions/actions'

const matchDispatchToProps = dispatch => {
  return {
    loginUser: (user) => {
      dispatch(loginUser(user));
    }
  }
};

const mapStateToProps = store => {
    return {
      users: store.users,
    }
};

function Login({users, loginUser}) {
    let arrOfUsers = [...users, ...dataUsers];
    // console.log('arrOfUsers', arrOfUsers);
    const [login, setLogin]=useState('');
    const [password, setPassword]=useState('');
    const [message, setMessage]=useState('');
    let history = useHistory();

    const LoginHendler =()=> {
        if(password && login){
            let matchUser = arrOfUsers.find(user => user.login===login);
            if(matchUser && matchUser.password === password){
                loginUser(matchUser)
                history.push('/')
                setPassword('')
                setLogin('')
                // localStorage.setItem('loginUser', JSON.stringify(matchUser))
            }
            else{
                setMessage('incorrect login or password')
                setPassword('')
            }
        }
        else{
            setMessage('you need to fill login and password field') 
        }
    }

    return (
      <div className="main container">
          <div className="login">
            <h1> Login</h1> 
            <div className='login-form'> 
                <div className='login-form-content'> 
                <label htmlFor=""> Login
                    <input type="text" placeholder='enter login' value={login} onChange={(e)=> setLogin(e.target.value)}/>
                </label>
                <label htmlFor=""> Password
                    <input type="password" placeholder='enter password'  value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </label>
                <div className='login-form-send'>
                    <button className="btn-main login-btn" onClick={LoginHendler} > login </button> 
                    <h4 className="error">{message}</h4>
                    {/* <Link className="btn-main " to="/" > login </Link>  */}
                </div>
                <Link className="login-form-registration" to="/registration"> Registration (i dont have an account yeat) </Link> 
                </div>
            </div>
          </div>
      </div>
    );
  }
  
export default connect(mapStateToProps, matchDispatchToProps)(Login);
