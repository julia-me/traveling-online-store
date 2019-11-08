const newToursInitialState = JSON.parse(localStorage.getItem('newTours')) || []

export default (state=newToursInitialState, action) => {
  switch(action.type){
    case 'ADD_TOUR':
        const {newTour} = action;
        console.log(newTour)
        const newState = [...state, newTour]
        localStorage.setItem('newTours', JSON.stringify(newState))
        console.log('newState', newState)
        return newState;
    default: return state
  }
}
