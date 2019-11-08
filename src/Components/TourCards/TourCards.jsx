import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'; 
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import tours from '../../data/tours'
import TourItem from './TourItem'
import './Tour.scss'

const mapStateToProps = store => {
  return {
    liginedUser: store.loginUser,
  }
};


function TourCards({liginedUser}) {
  const [loginMessage, setLoginMessage] = useState(false)

  console.log(tours)

  useEffect(()=>{
    if(liginedUser.length){
      setLoginMessage(false)
    }
  },[liginedUser])

    return (
      <div className="main container">
        <h1 className='tour-title'> Lets choose the best tour !</h1>
        {loginMessage  ? <h3 className='error'> to add tours in favourite you nedd login </h3> : null}
        <div className='row tour-wrapper'> 
        {tours.map(tour =>{
          return <TourItem setLoginMessage={setLoginMessage} data={tour} key={tour.id+tour.arrivalCity}/>
        })}
        </div>
      </div>
    );
  }
  
  export default connect(mapStateToProps, null)(TourCards);