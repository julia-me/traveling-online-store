const userInitialState = JSON.parse(localStorage.getItem("newUsers")) || [];

export default (state = userInitialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      const { newUser } = action;
      const totalInfo = { ...newUser, isLogin: true, isAdmin: false };
      let favourite = [];
      let allUserInfo = [totalInfo, favourite];
      const newState = [...state, allUserInfo];
      localStorage.setItem("newUsers", JSON.stringify(newState));
      return newState;

    case "ADD_FAVOURITE":
      const { tour } = action;
      let loginUser = JSON.parse(localStorage.getItem("loginUser"));
      let addedState = [...state];

      addedState.map(el => {
        if (el[0].id === loginUser[0].id) {
          const tourIndex = el[1].findIndex(elem => elem.id === tour.id);
          if (!state.length || tourIndex === -1) {
            el[1].push(tour);
            return localStorage.setItem("newUsers", JSON.stringify(addedState));
          }
        }
      });
      return addedState;

    case "REMOVE_FAVOURITE":
      const { deleteTour } = action;
      let loginedUser = JSON.parse(localStorage.getItem("loginUser"));
      let deletedState = [...state];

      deletedState.map(el => {
        if (el[0].id === loginedUser[0].id) {
          const deletedTourIndex = el[1].findIndex(
            elem => elem.id === deleteTour
          );
          el[1].splice(deletedTourIndex, 1);
          localStorage.setItem("newUsers", JSON.stringify(deletedState));
        }
      });
      return deletedState;

    default:
      return state;
  }
};
