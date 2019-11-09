const newToursInitialState = JSON.parse(localStorage.getItem("newTours")) || [];

export default (state = newToursInitialState, action) => {
  switch (action.type) {
    case "ADD_TOUR":
      const { newTour } = action;
      const newState = [...state, newTour];
      localStorage.setItem("newTours", JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};
