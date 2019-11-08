import {createStore, combineReducers} from 'redux';
import usersReducer from '../redusers/usersReduser'
import loginUserReduser from '../redusers/loginUserReduser'
import favouriteToursReducer from '../redusers/favouriteToursReducer'
import toursInCartReducer from '../redusers/cartReducer'
import orderReducer from '../redusers/ordersReducer'
import newToursReduser from '../redusers/newTours'

const initialState ={
    users: usersReducer,
    loginUser: loginUserReduser,
    favourite: favouriteToursReducer,
    cartTours: toursInCartReducer,
    orders: orderReducer,
    newTours: newToursReduser,
}

const rootRedecer =combineReducers(initialState);

const store = createStore(rootRedecer);

export default store 