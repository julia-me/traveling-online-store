const ordersInitialState = JSON.parse(localStorage.getItem('order')) || [];

export default (state=ordersInitialState, action) => {
  // let allUsers = [];
  switch(action.type){
    case 'ADD_ORDER':
    const { order } = action;
    const newState = [...state, order]
    localStorage.setItem('order', JSON.stringify(newState));
    return newState;

    default: return state
    }
}
