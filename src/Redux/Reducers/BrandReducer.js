import * as actionConstant from "../Actions/ActionConstant"

const initialState = {
    brandListStore: {},
}

export const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionConstant.BRAND_LIST_SUCCESS:
            return {...state, brandListStore: action.payload}
            
        default:
            return state;
    }
}
