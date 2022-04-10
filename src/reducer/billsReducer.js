const initialState = {bills:{data:[]}}

const billsReducer = (state=initialState.bills, action) => {
    
    switch (action.type) {
        case 'GET_ALL_BILLS': {
            return {...state, data:action.payload}
        }
        case 'ADD_BILL': {
            return {...state, data:[action.payload, ...state.data]}
        }
        case 'DELETE_BILL': {
            const result = state.data.filter(ele=>ele._id!==action.payload)
            return {...state, data: result}
        }
        default: {
            return state
        }
    }
}

export default billsReducer