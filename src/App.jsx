import React, {useState} from 'react';
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
import tours from './data/tours';

function App(props) {
  const [data, setData] = useState([])

  const TourPage = ({ match }) => {
    tours.forEach(tour => { 
      if(tour.id === +match.params.tour){
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
        <Route exact path='/policy' component={About} />
        <Route exact path='/booking' component={Booking} />
        <Route exact path='/favourite' component={Favourite} />
        <Route exact path='/logout' >
          <Logout />
        </Route>
        <Route exact path='/registration' >
          <Registration />
        </Route>
        <Route exact path='/cart' component={Cart} />
        {/* <Route  path='*' component={()=> <h1> 404 </h1>} /> */}

        <Route path="/:tour" component={TourPage}/>
      </Switch >
      {/* <Footer/> */}
      </React.Fragment>
  );
}

export default App;
