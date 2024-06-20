import * as actionConstant from "../Actions/ActionConstant"

const initialState = {
    categoryStore: {},
    discountStore: {}
}

export const SidebarCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionConstant.SIDEBAR_CATEGORY_SUCCESS:
            return {...state, categoryStore: action.payload}
        
        case actionConstant.DISCOUNT_SUCCESS: 
            return {...state, discountStore: action.payload}
        default:
            return state;
    }
}
