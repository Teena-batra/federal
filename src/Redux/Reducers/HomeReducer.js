import * as actionConstant from "../Actions/ActionConstant"

const initialState = {
    homeContentStore: {}
}

export const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionConstant.HOME_CONTENT_SUCCESS:
            return {...state, homeContentStore: action.payload}
            
        default:
            return state;
    }
}
