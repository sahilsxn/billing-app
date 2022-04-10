const initialState = {products:{data:[]}}

const productsReducer = (state=initialState.products, action) => {
    
    switch (action.type) {
        case 'GET_PRODUCTS': {
            return {...state, data:action.payload}
        }
        case 'ADD_PRODUCT': {
            return {...state, data:[action.payload, ...state.data]}
        }
        case 'DELETE_PRODUCT': {
            const result = state.data.filter(ele=>ele._id!==action.payload)
            return {...state, data:result}
        }
        case 'EDIT_PRODUCT': {
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

export default productsReducer