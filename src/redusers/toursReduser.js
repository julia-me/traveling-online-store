import tours from '../data/tours'
localStorage.setItem('tours', JSON.stringify(tours))

const toursInitialState = JSON.parse(localStorage.getItem('tours')) || []

export default (state=toursInitialState, action) => {
  switch(action.type){
    case 'ADD_TOUR':
    const {tour} = action;
    const newState = [...state, tour]
    localStorage.setItem('users', JSON.stringify(newState))
    return newState;

    default: return state
  }
}
