import * as actionConstant from "../Actions/ActionConstant"

const initialState = {
    cartStore: [],

}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionConstant.CART_ITEM_SUCCESS:
            return {...state, cartStore: action.payload}  
        case actionConstant.GET_ALL_SUCCESS:
            return {...state, cartStore: action.payload}

        default:
            return state;
    }
}
