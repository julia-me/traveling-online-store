export const addUser =(name, surname, email, login, password, city, telefone) => {
    const user = {name, surname, email, login, password, city, telefone};
    return {type: 'ADD_USER', user};
};

export const loginUser =(user) => {
    // const user = {user};
    return {type: 'LOGIN_USER', user};
};

export const logoutUser =(arr) => {
    // const user = {user};
    return {type: 'LOGOUT_USER', arr};
};

export const addToFavourite =(tour) => {
    return {type: 'ADD_TO_FAVOURITE', tour};
};

export const removeFromFavourite =(daeletedTour) => {
    console.log(daeletedTour)
    return {type: 'REMOVE_FROM_FAVOURITE', daeletedTour};
};

export const addToCart =(addTour) => {
    console.log(addTour)
    return {type: 'ADD_TO_CART', addTour};
};

export const removeFromCart=(removeTour) => {
    console.log(removeTour)
    return {type: 'REMOVE_FROM_CART', removeTour};
};