import * as actionConstant from "../Actions/ActionConstant"


const initialState = {
    createOrderStore: {},
    getOrderStore: {code: 400}

}

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionConstant.CREATE_ORDER_SUCCESS:
            return {...state, createOrderStore: action.payload} 
        
        case actionConstant.GET_ORDER_SUCCESS:
            return {...state, getOrderStore: action.payload }
        
        default:
            return state;
    }
}
