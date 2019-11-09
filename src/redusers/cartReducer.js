const cartInitialState = JSON.parse(localStorage.getItem("cart")) || [];

export default (state = cartInitialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { addTour } = action;
      const index = state.findIndex(elem => elem.id === addTour.id);
      if (!state.length || index === -1) {
        let newState = [...state, addTour];
        localStorage.setItem("cart", JSON.stringify(newState));
        newState = JSON.parse(localStorage.getItem("cart")) || [];
        return newState;
      }
      return state;

    case "REMOVE_FROM_CART":
      const { removeTour } = action;
      const deletedState = [...state].filter(item => item.id !== removeTour);
      localStorage.setItem("cart", JSON.stringify(deletedState));
      return deletedState;

    case "CLEAR_CART":
      const clearCart = [];
      localStorage.setItem("cart", JSON.stringify(clearCart));
      return clearCart;

    default:
      return state;
  }
};
