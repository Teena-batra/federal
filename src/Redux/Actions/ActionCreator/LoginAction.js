import axios from "axios";
import * as actionTypes from "../ActionTypes"
import {decryptData, encryptData} from "../../../utils/DataEncryptDecrypt"
import Cookies from "js-cookie"
import * as cartActionCreator from "../ActionCreator/CartAction"

export const checkMobileAction = (payload) => async (dispatch, getState, api) => {
    dispatch(actionTypes.loginSuccess({}));
    return axios.post(`https://api.gyftr.com/federalbank-api/api/v1/check/mobile`, {encryptedBody: encryptData(JSON.stringify(payload))})
    .then((res) => {
        if (res.data?.code === 200) {
            dispatch(actionTypes.checkMobileSuccess({...res.data.data}));
        }
    })
    .catch(() => {});
}


export const loginAction = (payload) => async (dispatch, getState, api) => {
    return axios.post(`https://api.gyftr.com/federalbank-api/api/v1/login`, {encryptedBody: encryptData(JSON.stringify(payload))})
    .then((res) => {
        if (res.data?.code === 200) {
            Cookies.set('token', res.data.token);
            const decrypt = JSON.parse(decryptData(res.data.data));
            //console.log("decrypt", decrypt);
            dispatch(actionTypes.profileSuccess({...decrypt, isLogin: true}));
            dispatch(profileAction());
           
        }
    })
    .catch(() => {});
}

export const profileAction = () => async(dispatch,getState, api) => {
   const token = Cookies.get('token');
   return axios.post('https://api.gyftr.com/federalbank-api/api/v1/getUserDetail', {}, {
    headers: {
      'token': token
    }
  }).then((res) => {
    if (res.data?.code === 200) {
        const decrypt = JSON.parse(decryptData(res.data.data));
        res.data.data = decrypt
        dispatch(actionTypes.profileSuccess({...res.data.data, isLogin: true}));
        dispatch(cartActionCreator.cartItemAction());
    }
})
.catch(() => {});
}

export const registerAction = (payload) => async(dispatch,getState, api) => {
    return axios.post('https://api.gyftr.com/federalbank-api/api/v1/register', {encryptedBody: encryptData(JSON.stringify(payload))})
    .then((res) => {
     if (res.data?.code === 200) {
        dispatch(actionTypes.registerSuccess({...res.data}));
        
         
     }
     else if(res.data?.code === 201){
        console.log("res===============201", res);
        Cookies.set('token', res.data.token);
        const decrypt = JSON.parse(decryptData(res.data.data));
        res.data.data = decrypt
        console.log("res.data.data", decrypt);
        dispatch(actionTypes.registerSuccess({...res.data}));
        dispatch(profileAction());
     }
 })
 .catch(() => {});
 }







