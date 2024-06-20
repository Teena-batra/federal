
import * as actionTypes from "../ActionTypes"


export const logoutAction = () => () => {
        dispatch(actionTypes.logoutSuccess());

 }