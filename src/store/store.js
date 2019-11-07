import {createStore, combineReducers} from 'redux';
import usersReducer from '../redusers/usersReduser'
import loginUserReduser from '../redusers/loginUserReduser'
import favouriteToursReducer from '../redusers/favouriteToursReducer'
import toursInCartReducer from '../redusers/cartReducer'

const initialState ={
    users: usersReducer,
    loginUser: loginUserReduser,
    favourite: favouriteToursReducer,
    cartTours: toursInCartReducer,
}

const rootRedecer =combineReducers(initialState);

const store = createStore(rootRedecer);

export default store 