import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import './Registration.scss'
import { connect } from 'react-redux';
import { addUser, loginUser } from '../../actions/actions'
import dataUsers from '../../data/users'


const matchDispatchToProps = dispatch => {
  return {
    addUser: (name, surname, email, login, password, city, telefone) => {
      dispatch(addUser(name, surname, email, login, password, city, telefone));
    },
    loginUser: (user) => {
      dispatch(loginUser(user));
    }
  }
}

const mapStateToProps = store => {
  return {
    users: store.users,
  }
}

function Registration(props) {
  const {users} = props
  // console.log()
  let history =useHistory()
  let arrOfUsers = [...users, ...dataUsers];
  const [message, setMessage]=useState('');
  const [emptyFields, setEmptyFields]=useState('');

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [telefone, setTelefone] = useState(+380);



  const RegistrationHendler =()=>{
    let invalidLogin = arrOfUsers.find(el=> el.login === login)
    if(!invalidLogin && name && surname && email && login && password && city && telefone){
      props.addUser(name, surname, email, login, password, city, telefone);
      props.loginUser({name, surname, email, login, password, city, telefone})
      setName('');
      setSurname('');
      setEmail('');
      setLogin('');
      setEmail('');
      setLogin('');
      setTelefone(+380)
      history.push('/')
    }
    if(invalidLogin && name && surname && email && login && password && city && telefone){
      setMessage('this login already exist')
      setEmptyFields('')
    }
    else{
      setEmptyFields('you need to fill all form\'s field')
    }
  }

    return (
      <div className="main container">
          <div className="registration">
            <h1> You need to fill this form for registration </h1>
            <div className='registration-form'>
            <div className="registration-form-content">
              <div className="registration-form-item">
                  <label htmlFor=""> Name *
                    <input type="text" placeholder='enter name' value={name} onChange={(e)=> setName(e.target.value)}/>
                  </label>
              </div>
              <div className="registration-form-item">
                  <label htmlFor=""> Surname *
                    <input type="text" placeholder='enter surname' value={surname} onChange={(e)=> setSurname(e.target.value)}/>
                  </label>
              </div>
              <div className="registration-form-item">
                  <label htmlFor=""> Email *
                    <input type="email" placeholder='enter email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                  </label>
              </div>
              <div className="registration-form-item">
                  <label htmlFor=""> Login *
                    <input type="text" placeholder='create login' value={login} onChange={(e)=> setLogin(e.target.value)}/>
                  </label>
                  <p className="error">  {message} </p>
              </div>
              <div className="registration-form-item">
                  <label htmlFor=""> Password *
                    <input type="password" placeholder='create password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                  </label>
              </div>
              <div className="registration-form-item">
                  <label htmlFor=""> City *
                    <input type="text" placeholder='enter city' value={city} onChange={(e)=> setCity(e.target.value)} />
                  </label>
              </div>
              <div className="registration-form-item">
                  <label htmlFor=""> Phone number *
                    <input type="number" placeholder='enter phone number' value={telefone} onChange={(e)=> setTelefone(e.target.value)} />
                  </label>
              </div>
              <p> <span> * - </span> required fields </p>
              <div className="registration-form-send"> 
               <button className="btn-main " onClick={RegistrationHendler}> rigister user </button> 
              </div>
              <p className="error"> {emptyFields} </p>
            </div>
            </div> 
          </div>
      </div>
    );
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(Registration);