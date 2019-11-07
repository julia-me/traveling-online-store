
const favInitialState = JSON.parse(localStorage.getItem('fav')) || []

export default (state=favInitialState, action) => {
  switch(action.type){
    case 'ADD_TO_FAVOURITE':
        const { tour } = action;
        const index = state.findIndex(elem => elem.id === tour.id)
        if(!state.length || index === -1){
            let newState = [...state, tour]
            localStorage.setItem('fav', JSON.stringify(newState))
            newState = JSON.parse(localStorage.getItem('fav')) || []
            return newState;
        }
    case 'REMOVE_FROM_FAVOURITE':
        const { daeletedTour } = action;
        const deletedState = [...state].filter(item => item.id !== daeletedTour);
        localStorage.setItem('fav', JSON.stringify(deletedState));
        return deletedState

    default: return state
  }
}

