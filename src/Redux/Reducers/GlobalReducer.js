import * as actionConstant from "../Actions/ActionConstant"

const initialState = {
    navListStore: [],
}

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionConstant.NAV_LIST_SUCCESS:
            return {...state, navListStore: action.payload}
            
        default:
            return state;
    }
}
