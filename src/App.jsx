import React, {useState} from 'react';
import { connect } from 'react-redux'; 
import { Router, Route, Switch } from "react-router";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import TourCards from './Components/TourCards/TourCards';
import TourDetails from './Components/TourCards/TourDetails';
import Login from './Components/Login/Login';
import Logout from './Components/Login/Logout';
import Favourite from './Components/Favourite/Favourite';
import Registration from './Components/Registration/Registration';
import Cart from './Components/Cart/Cart';
import About from './Components/About/About';
import Booking from './Components/Booking/Booking';
import FinishedBooking from './Components/Booking/FinishedBooking'
import toursData from './data/tours';
import Orders from './Components/Orders/Orders'
import Create from './Components/Create/Create'

const mapStateToProps = store => {
  return {
    newTours: store.newTours,
  }
};

function App({newTours}) {
  const [data, setData] = useState([])
  let tours = [...toursData, ...newTours]

  const TourPage = ({ match }) => {
    console.log(match)
    tours.forEach(tour => { 
      if(tour.id === +match.params.tour){
        console.log(tour)
        return setData(tour)
      }
    })
      return(
        <TourDetails data={data} />
      )

  }

  return (
    <React.Fragment>
      <Header />
      <Switch >
        <Route  exact path='/' component={TourCards} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/about' component={About} />
        <Route exact path='/booking' component={Booking} />
        <Route exact path='/finishedBooking' component={FinishedBooking} />
        <Route exact path='/favourite' component={Favourite} />
        <Route exact path='/logout'component={Logout} />
        <Route exact path='/registration'component={Registration} />
        <Route exact path='/orders'component={Orders} />
        <Route exact path='/create'component={Create} />
        <Route exact path='/cart' component={Cart} />

        <Route path="/:tour" component={TourPage}/>
        <Route  path='*' component={()=> <h1> 404 </h1>} />
      </Switch >
      {/* <Footer/> */}
      </React.Fragment>
  );
}

// export default App;
export default connect(mapStateToProps, null)(App);
