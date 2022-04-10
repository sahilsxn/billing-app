const initialState = {user:{}, isAuthenticated: localStorage.getItem('token') ? true : false}

const userReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case 'LOGIN': {
            return {...state, isAuthenticated:!state.isAuthenticated}
        } case 'GET_USER': {
            return {...state, user: action.payload}
        }
        default: {
            return state
        }
    }
}

export default userReducer