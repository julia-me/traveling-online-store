import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import dataUsers from "../../data/users";
import { loginUser } from "../../actions/actions";
import "./Login.scss";

const matchDispatchToProps = dispatch => {
  return {
    loginUser: user => {
      dispatch(loginUser(user));
    }
  };
};

const mapStateToProps = store => {
  return {
    users: store.users
  };
};

function Login({ users, loginUser }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  let history = useHistory();
  let allUsers = [...dataUsers, ...users];

  const LoginHendler = () => {
    if (password && login) {
      let matchUser = allUsers.find(user => user[0].login === login);
      if (matchUser && matchUser[0].password === password) {
        loginUser(matchUser[0]);
        history.push("/");
        setPassword("");
        setLogin("");
      } else {
        setMessage("incorrect login or password");
        setPassword("");
      }
    } else {
      setMessage("you need to fill login and password fields");
    }
  };

  return (
    <div className="main container">
      <div className="login">
        <h1> Login</h1>
        <div className="login-form">
          <div className="login-form-content">
            <label htmlFor="">
              Login
              <input
                type="text"
                placeholder="enter login"
                value={login}
                onChange={e => setLogin(e.target.value)}
              />
            </label>
            <label htmlFor="">
              Password
              <input
                type="password"
                placeholder="enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            <div className="login-form-send">
              <button className="btn-main login-btn" onClick={LoginHendler}>
                login
              </button>
              <h4 className="error">{message}</h4>
            </div>
            <Link className="login-form-registration" to="/registration">
            Registration (i don't have an account yet)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Login);
