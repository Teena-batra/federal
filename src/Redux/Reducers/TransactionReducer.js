import * as actionConstant from "../Actions/ActionConstant"

const initialState = {
    transactionStore: {code:400}
}

export const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionConstant.TRANSACTION_SUCCESS:
            return {...state, transactionStore: action.payload}
        
        default:
            return state;
    }
}
