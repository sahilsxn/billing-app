const initialState = {customers:{data:[]}}

const customersReducer = (state=initialState.customers, action) => {
    
    switch (action.type) {
        case 'GET_CUSTOMERS': {
            return {...state, data:action.payload}
        }
        case 'ADD_CUSTOMER': {
            return {...state, data:[action.payload, ...state.data]}
        }
        case 'DELETE_CUSTOMER': {
            const result = state.data.filter(ele=>ele._id!==action.payload)
            return {...state, data:result}
        }
        case 'EDIT_CUSTOMER': {
            const result = state.data.map(ele=>{
                if(ele._id === action.payload._id){
                    return {...action.payload}
                } else {
                    return {...ele}
                }
            })
            return {...state, data:result}
        }
        default: {
            return state
        }
    }
}

export default customersReducer