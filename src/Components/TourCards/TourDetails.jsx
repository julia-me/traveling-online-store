import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'; 
import {Link, useHistory} from 'react-router-dom';
import Swiper from 'react-id-swiper';
import {addToCart, removeFromCart} from '../../actions/actions'
import tours from '../../data/tours'
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import './Tour.scss'

const mapStateToProps = store => {
  return {
    cartTours: store.cartTours,
  }
};

const matchDispatchToProps = dispatch => {
  return {
    addToCart: (addTour) => {
      dispatch(addToCart(addTour));
    },
    removeFromCart: (removeTour) => {
      dispatch(removeFromCart(removeTour));
    }
  }
};

function TourDetails({addToCart, cartTours, removeFromCart}) {
  let id = window.location.pathname.slice(1)
  const data = tours.find(el => el.id === +id);
  const [transport, setTransport]= useState([]);
  const history =useHistory()
  const match = cartTours.find( tour => tour.id === +id)

    const ChooseTransportHendler =(e) =>{
      let choosenTransport= e.target.value;
      let transOpt = data.transportOption.find(el => el.transport === choosenTransport)
      setTransport([transOpt])
    }

    const AddToCartHendler=()=>{
      console.log(transport)
      if(transport.length){
        let bookedTour = {...data}
        bookedTour.transportOption = transport
        addToCart(bookedTour)
        history.push('/cart')
      }
    }

    const params = {
      spaceBetween: 30,
      centeredSlides: true,
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false
      // },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }

    return (
      <div className="tour-info container">
          <h1> {data.arrivalCountry} </h1>
          <h2> {data.arrivalCity}  </h2>
          <p className='tour-info-text'> Departure at {data.startDay.toLocaleDateString()} from: {data.departureCity}</p>
          <p className='tour-info-text'> Arrival back at {data.endDay.toLocaleDateString()}</p>
          <p className='tour-info-text'>  {(data.endDay - data.startDay)/(24*60*60*1000)}  days tour </p> 
          {/* <p> Arrival  to {data.departureCity} </p> */}
          <Swiper {...params} className="swiper tour-info-slider"> 
          {data && data.arrOfImg.map((img, index) =>{
            return(
              <div key={img+index} className="tour-info-slider-item">
                <img src={img} alt="" width="300px"/>
              </div>
            )
          })}
          </Swiper>
          <p className='tour-info-text'> Tour for {data.numberOfTrevellers}  person</p>
        <p className='tour-info-description'>  Tour description: {data.description} </p>
        {!match &&
        <div>
          <p className='tour-info-message'> To count the price of tour you should choose transport option bellow:</p>
          <div className='tour-info-transport'>
          {data && data.transportOption.map(transOpt => {
               return(
                   <label htmlFor={transOpt.transport} key={data.id+transOpt.transport}> {transOpt.transport}
                       <input id={transOpt.transport} type="radio" name="transport" value={transOpt.transport} onChange={(e)=> ChooseTransportHendler(e) }/>
                   </label>
               )
           })}
          </div>
          {transport.length ? 
          <>
          <p className='tour-info-cost'> Price of tour: {transport.length && transport[0].price} $.</p>
          <button  onClick={AddToCartHendler}  className='btn-main'>  Book the toor </button>  
          </>: null}
        </div>
        }
        {match && 
          <div className='tour-info-delete'>
            <div>
            <p className='tour-info-delete-text'> This tour already exist in the cart. </p>
            <p className='tour-info-delete-text'> Do you want to delete it? </p>

            </div>
              <svg  onClick={(e)=> removeFromCart(data.id)} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" className="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
          </div>}
      </div>
    );
  }
  
  // export default TourDetails;

  export default connect(mapStateToProps, matchDispatchToProps)(TourDetails);