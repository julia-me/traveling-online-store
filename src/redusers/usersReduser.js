// import users from '../data/users';
// localStorage.setItem('users', JSON.stringify(users))

const userInitialState = JSON.parse(localStorage.getItem('users')) || []

export default (state=userInitialState, action) => {
  switch(action.type){
    case 'ADD_USER':
    const { user } = action;
    // console.log(user)
    const totalInfo = {...user, isLogin: true, isAdmin: false};
    // localStorage.setItem('oneUser', JSON.stringify(totalInfo))

    const newState = [...state, totalInfo]
    localStorage.setItem('users', JSON.stringify(newState))
    return newState;

    default: return state
  }
}

