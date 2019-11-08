import users from '../data/users';
// localStorage.setItem('users', JSON.stringify(users))

const userInitialState = JSON.parse(localStorage.getItem('newUsers')) || [];

// let dataUsers = users.map(user => {
//   return [user, []]
// })
// console.log(dataUsers)


export default (state=userInitialState, action) => {
  // let allUsers = [];
  switch(action.type){
    case 'ADD_USER':
    const { newUser } = action;
    const totalInfo = {...newUser, isLogin: true, isAdmin: false};
    let favourite = []
    let allUserInfo=[totalInfo, favourite]
    const newState = [...state, allUserInfo]
    localStorage.setItem('newUsers', JSON.stringify(newState));
    return newState;

  case 'ADD_FAVOURITE':
      const { tour } = action;
      let loginUser = JSON.parse(localStorage.getItem('loginUser')) 
      let addedState = [...state]
      console.log(addedState)

      addedState.map(el => {
        if(el[0].id === loginUser[0].id){
          const tourIndex = el[1].findIndex(elem => elem.id === tour.id)
          if(!state.length || tourIndex === -1){
            el[1].push(tour)
            localStorage.setItem('newUsers', JSON.stringify(addedState));
            // return addedState;
          }
        }
      });
      return addedState;

    case 'REMOVE_FAVOURITE':
        const { deleteTour } = action;
        // let deletedState = JSON.parse(localStorage.getItem('allUsers')) || [...users]
        let loginedUser = JSON.parse(localStorage.getItem('loginUser')) 
        // console.log('deleteTour', deleteTour)
        let deletedState = [...state]
  
        deletedState.map(el => {
          if(el[0].id === loginedUser[0].id){
            const deletedTourIndex = el[1].findIndex(elem => elem.id === deleteTour)
            console.log(deletedTourIndex);
            el[1].splice(deletedTourIndex, 1);
            localStorage.setItem('newUsers', JSON.stringify(deletedState));
            // return deletedState;
            // if(!state.length || deletedTourIndex === -1){
            //   el[1].push(tour)
            //   localStorage.setItem('allUsers', JSON.stringify(state))
            //   return state;
            // }
          }
        });
        return deletedState;

        // const { daeletedTour } = action;
        // const deletedState = [...state].filter(item => item.id !== daeletedTour);
        // localStorage.setItem('fav', JSON.stringify(deletedState));
        // return deletedState

    default: return state
  }
}

