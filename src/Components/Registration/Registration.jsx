import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addUser, loginUser } from "../../actions/actions";
import dataUsers from "../../data/users";
import "./Registration.scss";

const matchDispatchToProps = dispatch => {
  return {
    addUser: newUser => {
      dispatch(addUser(newUser));
    },
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

function Registration(props) {
  const { users } = props;
  let history = useHistory();
  let arrOfUsers = [...users, ...dataUsers];
  const [message, setMessage] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [emptyFields, setEmptyFields] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [telefone, setTelefone] = useState(+380);
  let telNumberString = telefone.toString();
  let validNumber = telNumberString.length === 12 ? true : false;
  let validEmail = email.includes("." && "@") ? true : false;
  let invalidLogin = arrOfUsers.find(el => el[0].login === login);
  let invalidEmail = arrOfUsers.find(el => el[0].email === email);

  let someFunc = () => {
    if (invalidLogin) {
      setMessage("this login already exist");
    }
    if (invalidEmail) {
      setMessageEmail("this email already exist");
    }
    if (!invalidLogin) {
      setMessage(false);
    }
    if (!invalidEmail) {
      setMessageEmail(false);
    }
  };

  useEffect(() => {
    someFunc();
  }, [login, email]);

  const RegistrationHendler = e => {
    e.preventDefault()
    if (
      !invalidLogin &&
      !invalidEmail &&
      validNumber &&
      validEmail &&
      name &&
      surname &&
      login &&
      password &&
      city &&
      telefone
    ) {
      props.addUser({
        name,
        surname,
        email,
        login,
        password,
        city,
        telefone,
        id: users.length + login
      });
      props.loginUser({
        name,
        surname,
        email,
        login,
        password,
        city,
        telefone,
        id: users.length + login
      });
      setName("");
      setSurname("");
      setEmail("");
      setLogin("");
      setEmail("");
      setLogin("");
      setTelefone(+380);
      history.push("/");
    }
    if (name && surname && email && login && password && city && telefone) {
      setEmptyFields("");
    } else {
      setEmptyFields("you need to fill all form's fields");
    }
  };

  return (
    <div className="main container">
      <div className="registration">
        <h1> You need to fill this form for registration </h1>
        <form className="registration-form">
          <div className="registration-form-content">
            <div className="registration-form-item">
              <label htmlFor="">
                Name *
                <input
                  type="text"
                  placeholder="enter name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </label>
            </div>
            <div className="registration-form-item">
              <label htmlFor="">
                Surname *
                <input
                  type="text"
                  placeholder="enter surname"
                  value={surname}
                  onChange={e => setSurname(e.target.value)}
                />
              </label>
            </div>
            <div className="registration-form-item">
              <label htmlFor="">
                Email *
                <input
                  type="email"
                  placeholder="enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                {!validEmail && (
                  <small id="emailHelp" className="error">
                    example of email: example@mail.com
                  </small>
                )}
              </label>
              <p className="error"> {messageEmail} </p>
            </div>
            <div className="registration-form-item">
              <label htmlFor="">
                Login *
                <input
                  type="text"
                  placeholder="create login"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                />
              </label>
              <p className="error"> {message} </p>
            </div>
            <div className="registration-form-item">
              <label htmlFor="">
                Password *
                <input
                  type="password"
                  placeholder="create password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="registration-form-item">
              <label htmlFor="">
                City *
                <input
                  type="text"
                  placeholder="enter city"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </label>
            </div>
            <div className="registration-form-item">
              <label htmlFor="">
                Phone number *
                <input
                  type="number"
                  placeholder="enter phone number"
                  value={telefone}
                  onChange={e => setTelefone(e.target.value)}
                />
                {!validNumber && (
                  <small id="emailHelp" className="error">
                    Phone number must contain 12 figures
                  </small>
                )}
              </label>
            </div>
            <p>
              <span> * - </span> required fields
            </p>
            <div className="registration-form-send">
              <button
                className="btn-main "
                onClick={e => RegistrationHendler(e)}
              >
                rigister user
              </button>
            </div>
            <p className="error"> {emptyFields} </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Registration);
