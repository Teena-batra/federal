import * as actionConstant from "../Actions/ActionConstant"
const initialState = {
    
    loginStore: {},
    userInfoStore: {isLogin: false},
}

//console.log("===userStore",initialState.userInfoStore);
export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionConstant.CHECK_MOBILE_SUCCESS:
            return {...state, loginStore: action.payload}
        case actionConstant.PROFILE_SUCCESS:
            return {...state, userInfoStore: action.payload}  
        case actionConstant.REGISTER_SUCCESS:
            return {...state, userInfoStore: action.payload}  
        default:
            return state;
    }
}
//console.log("===userStoreAfter",initialState.userInfoStore);
