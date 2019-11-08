import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'; 
import {Link} from 'react-router-dom';
import { addToFavourite } from '../../actions/actions';


const matchDispatchToProps = dispatch => {
    return {
        addToFavourite: (tour) => {
        dispatch(addToFavourite(tour));
      }
    }
};

const mapStateToProps = store => {
    return {
      favArr: store.users,
      liginedUser: store.loginUser,
    }
};


function TourItem({data, addToFavourite, favArr, liginedUser, setLoginMessage}) {
    const [price, setPrice]= useState(0);
    const [inFav, setInFav]=useState('svg-inline--fa fa-heart fa-w-16')

    const heartDecoration =()=>{
        if(liginedUser.length && !liginedUser[0].isAdmin){
            const fav = favArr.find( el=> el[0].id === liginedUser[0].id)
            fav[1].find( tour=> {
                if(tour.id === data.id){
                    setInFav('svg-inline--fa fa-heart fa-w-16 active-heart')
                }
            })
        }
    }

    useEffect(()=> {
        MinPrice()
        heartDecoration()
    },[])

    // const ViewTourHendler =() => {
    //     localStorage.setItem('Tour', JSON.stringify(data))
    // }
    const AddToFavHandler =()=>{
        // console.log(data)
        if(liginedUser.length){
            addToFavourite(data)
        }
        else{
            setLoginMessage(true)
        }
        heartDecoration()
    }

    const MinPrice =() =>{
        const priceArr = data.transportOption.map(el => el.price)
        setPrice(Math.min(...priceArr))
    }

    let endDay = new Date(data.endDay)
    let startDay = new Date(data.startDay)

    return (
      <div className="col-6 col-md-4 tour-card-wrapper some">
          <div className='tour-item tour-card'>
            <h2> {data.arrivalCountry}</h2>
            <h3> {data.arrivalCity}</h3>
            <div className='tour-item-city-img'>
                <img src={data.mainImg} alt="" className='tour-item-img'/>
            </div>
            <p> {(endDay - startDay)/(24*60*60*1000)} days vacation</p>
          </div>
          <div className='tour-item-back tour-card'>
            <div className="tour-item-back-like">
                <svg onClick={AddToFavHandler}  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className={inFav} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
            </div>
            <h3>  <span className="tour-item-departure"> Departure from </span> {data.departureCity} </h3>
            <h3>  <span className="tour-item-departure">  Arrival city  </span>  {data.arrivalCity}  ({data.arrivalCountry} ) </h3>
            <p> from {startDay.toLocaleDateString()}  to  {endDay.toLocaleDateString()} ({(endDay - startDay)/(24*60*60*1000)} days) </p>
            <p> tour for {data.numberOfTrevellers}  person</p>
            <p> Cost from: {price} $.</p>
            <div className="tour-item-back-more">
                <Link to={{pathname: `/${data.id}`}}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-double-right" className="svg-inline--fa fa-angle-double-right fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path></svg>
                </Link>
            </div>
          </div>
      </div>
    );
  }

  export default connect(mapStateToProps, matchDispatchToProps)(TourItem);