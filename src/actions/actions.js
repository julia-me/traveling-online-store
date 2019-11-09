export const addUser =(newUser) => {
    const user = {newUser};
    return {type: 'ADD_USER', newUser};
};

export const loginUser =(user) => {
    // const user = {user};
    return {type: 'LOGIN_USER', user};
};

export const logoutUser =(arr) => {
    // const user = {user};
    return {type: 'LOGOUT_USER', arr};
};

// export const addToFavourite =(tour) => {
//     return {type: 'ADD_TO_FAVOURITE', tour};
// };

export const addToFavourite =(tour) => {
    return {type: 'ADD_FAVOURITE', tour};
};

// export const removeFromFavourite =(deleteTour) => {
//     console.log(deleteTour)
//     return {type: 'REMOVE_FROM_FAVOURITE', deleteTour};
// };

export const removeFromFavourite =(deleteTour) => {
    return {type: 'REMOVE_FAVOURITE', deleteTour};
};

export const addToCart =(addTour) => {
    return {type: 'ADD_TO_CART', addTour};
};

export const removeFromCart=(removeTour) => {
    return {type: 'REMOVE_FROM_CART', removeTour};
};

export const addOrder=(order) => {
    return {type: 'ADD_ORDER', order};
};

export const clearCart=() => {
    return {type: 'CLEAR_CART'};
};

export const addNewTour=(newTour) => {
    return {type: 'ADD_TOUR', newTour};
};

export const changeOrderStatus=(oderStatus) => {
    return {type: 'CHANGE_ORDER_STATUS', oderStatus};
};

