import React, {useState} from 'react';
import { connect } from 'react-redux'; 
import {Link, useHistory} from 'react-router-dom';
import './Create.scss';
import tours from '../../data/tours';
import {addNewTour} from '../../actions/actions';

const mapStateToProps = store => {
  return {
    newTours: store.newTours,
  }
};

const matchDispatchToProps = dispatch => {
  return {
    addNewTour: (newTour) => {
      dispatch(addNewTour(newTour));
    }
  }
};

function Create({addNewTour, newTours}) {
  const [departureCity, setDepartureCity]= useState('');
  const [arrivalCounty, setArrivalCounty]= useState('');
  const [arrivalCity, setArrivalCity]= useState('');
  const [description, setDescription]= useState('');
  const [travelers, setTravelers]= useState('1');
  const [endDay, setEndDay]= useState('');
  const [startDay, setStartDay]= useState('');
  const [mainImg, setMainImg]= useState('');
  const [arrOfimg, setArrOfimg]= useState('');
  const [transportInfo, setTransportInfo]= useState();
  const [transportInfo2, setTransportInfo2]= useState();
  let history = useHistory()

  const changePhoto =(e) => {
    const file= e.target.files[0]
    if(!file) return
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setMainImg(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }

  const createTourHendler =()=> {
    let tour = {
      id: newTours.length+ 3001,
      arrivalCountry: arrivalCounty,
      arrivalCity: arrivalCity,
      departureCity: departureCity,
      description: description,
      mainImg: mainImg,
      arrOfImg: arrOfimg.split(','),
      numberOfTrevellers: +travelers,
      transportOption: [transportInfo, transportInfo2],
      startDay: startDay.replace(/-/g, '/'),
      endDay: endDay.replace(/-/g, '/'),
    }
    if(departureCity && arrivalCounty && description && travelers && endDay && startDay && mainImg && arrOfimg && transportInfo){
      addNewTour(tour);
      history.push('/')
      // console.log(tour)
    }
  }

    return (
      <div className="create container">
        <h1 className='create-title' > Fill the form filds to add new tour</h1>
        <div className='booking-form'>
              <div className='form-group'>
                  <label htmlFor="departure"> Departure city </label>
                  <input onChange={(e)=> setDepartureCity(e.target.value)} type="text" id="departure" className='form-control' value={departureCity} placeholder='enter departure city' />
              </div>
              <div className='form-group'>
                  <label htmlFor="arrivalCounty"> Arrival country </label>
                  <input onChange={(e)=> setArrivalCounty(e.target.value)} type="text" id="arrivalCounty" className='form-control'value={arrivalCounty}  placeholder='enter arrival county' />
              </div>
              <div className='form-group'>
                  <label htmlFor="arrivalCity"> Arrival city  </label>
                  <input onChange={(e)=> setArrivalCity(e.target.value)} type="text" id="arrivalCity" className='form-control' value={arrivalCity}  placeholder='enter arrival city' />
              </div>
              <div className='form-group'>
                  <label htmlFor="description"> Description </label>
                  <textarea name="description" id="description" cols="30" rows="10" onChange={(e)=> setDescription(e.target.value)} type="text" id="description" className='form-control' value={description}  placeholder='enter description' ></textarea>
              </div>
              <div className='form-group'>
                  <label htmlFor="travelers"> Number of travelers </label>
                  <input onChange={(e)=> setTravelers(e.target.value)} type="number" id="travelers" className='form-control' value={travelers}  placeholder='enter number of travelers' />
              </div>
              <div className='form-group'>
                  <label htmlFor="startDay"> Start day of tour </label>
                  <input onChange={(e)=> setStartDay(e.target.value)} type="date" id="startDay" className='form-control' value={startDay}  placeholder='enter start day' />
              </div>
              <div className='form-group'>
                  <label htmlFor="endDay"> End day of tour </label>
                  <input onChange={(e)=> setEndDay(e.target.value)}  min={startDay} type="date" id="endDay" className='form-control' value={endDay}  placeholder='enter end day' />
              </div>
              <div className='form-group'>
                  <label htmlFor="mainImg"> End main image link or download image from your computer</label>
                  <input onChange={(e)=> setMainImg(e.target.value)} type="text" id="mainImg" className='form-control' value={mainImg}  placeholder='enter main image' />
                  <br/>
                  <input className='form-control' type="file" placeholder="change photo" onChange={(e)=> changePhoto(e)} />
              </div>
              <div className='form-group'>
                  <label htmlFor="arrOfimg"> Enter links to make arr of images </label>
                  <input onChange={(e)=> setArrOfimg(e.target.value)} type="text" id="arrOfimg" className='form-control'value={arrOfimg}  placeholder='enter links' />
                  <small id="emailHelp" className="form-text text-muted"> you need to enter all links with using ',' and not using ' '*gap</small>
              </div>
              <div  className='form-group'> 
                <h5> transport info options </h5>
                <div>
                  <input type="text" onChange={(e)=> setTransportInfo({...transportInfo, transport: e.target.value})}  placeholder='type of transport'/>
                  <input type="number" onChange={(e)=> setTransportInfo({...transportInfo, price: +e.target.value})} placeholder='price of tour'/>
                </div>
                <div>
                  <input type="text" onChange={(e)=> setTransportInfo2({...setTransportInfo2, transport: e.target.value})}  placeholder='type of transport'/>
                  <input type="number" onChange={(e)=> setTransportInfo2({...transportInfo2, price: +e.target.value})} placeholder='price of tour'/>
                </div>
              </div>
              <div className='booking-form-btn'>
              <button onClick={createTourHendler} type="button" className="btn btn-info">finish </button>
              </div>
          </div>
      </div>
    );
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(Create);
  // export default Create;