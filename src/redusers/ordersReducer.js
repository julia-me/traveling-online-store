const ordersInitialState = JSON.parse(localStorage.getItem('order')) || [];

export default (state=ordersInitialState, action) => {
  // let allUsers = [];
  switch(action.type){
    case 'ADD_ORDER':
    const { order } = action;
    const newState = [...state, order]
    localStorage.setItem('order', JSON.stringify(newState));
    return newState;

    case 'CHANGE_ORDER_STATUS':
        const { oderStatus } = action;
        state.map( el => {
          if(el[3].id === oderStatus.id){
            el[3] = oderStatus
          }
        })
        // console.log('changedState', state);
        localStorage.setItem('order', JSON.stringify(state));
        return state;

    default: return state
    }
}
