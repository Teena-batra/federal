import * as actionConstant from "../Actions/ActionConstant"

const initialState = {
    userInfoStore: {isLogin: false},
}

//console.log("===userStore",initialState.userInfoStore);
export const logoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionConstant.LOGOUT_SUCCESS:
            return {...state, userInfoStore: action.payload} 
        default:
            return state;
    }
}
//console.log("===userStoreAfter",initialState.userInfoStore);
