import axios from "axios";
import * as actionTypes from "../ActionTypes"
import {decryptData, encryptData} from "../../../utils/DataEncryptDecrypt"
import Cookies from "js-cookie"

const authHeaders = (token) => {
    return {
      'Content-Type': 'application/json',
      token: token || null,
    };
  };

export const addToCartAction = (payload) => async (dispatch, getState, api) => {
    const jwtToken = Cookies.get('token');
    return axios
      .post("https://api.gyftr.com/federalbank-api/api/v1/cart/add", { encryptedBody: encryptData(JSON.stringify({ products: [payload] })) }, { headers: await authHeaders(jwtToken) })
      .then((res) => {
        if (res.data?.code === 200) {
            dispatch(cartItemAction());
          }
      })
      .catch(() => {});
  };
 
  export const cartItemAction = () => async (dispatch, getState, api) => {
    const jwtToken = Cookies.get('token');
    return axios
      .post("https://api.gyftr.com/federalbank-api/api/v1/cart/getall", {}, { headers: await  authHeaders(jwtToken) })
      .then((res) => {
        if (res.data?.code === 200) {
            const decrypt = JSON.parse(decryptData(res.data.data));
            res.data.data = decrypt 
            dispatch(actionTypes.cartItemSuccess(res.data.data));
          }
      })
      .catch(() => {});
  };

  
export const cartItemRemoveAction = (payload) => async (dispatch, getState, api) => {
    const jwtToken = Cookies.get('token');
    return axios
      .post("https://api.gyftr.com/federalbank-api/api/v1/cart/remove",  { encryptedBody: encryptData(JSON.stringify(payload )) }, 
        { headers: await  authHeaders(jwtToken) }
      )
      .then((res) => {
        if (res.data?.code === 200) {
             
            dispatch(cartItemAction());
          }
      })
      .catch(() => {});
  };




  export const cartItemUpdateAction = (payload) => async (dispatch, getState, api) => {
    //console.log("payload======", payload);
    const jwtToken = Cookies.get('token');
    return axios
      .post("https://api.gyftr.com/federalbank-api/api/v1/cart/update",  { encryptedBody: encryptData(JSON.stringify(payload )) }, 
        { headers: await  authHeaders(jwtToken) }
      )
      .then((res) => {
        if (res.data?.code === 200) {
             
            dispatch(cartItemAction());
          }
      })
      .catch(() => {});
  };
 
  export const updateDeliveryDetailAction = (payload) => async (dispatch, getState, api) => {
    console.log("payload======", payload);
    const jwtToken = Cookies.get('token');
    return axios
      .post("https://api.gyftr.com/federalbank-api/api/v1/cart/updateDeliveryDetail",  { encryptedBody: encryptData(JSON.stringify(payload )) }, 
        { headers: await  authHeaders(jwtToken) }
      )
      .then((res) => {
        if (res.data?.code === 200) {
            dispatch(cartItemAction());
          }
      })
      .catch(() => {});
  };
 

  export const cartGetAllAction = () => async (dispatch, getState, api) => {
    //console.log("payload======", payload);
    const jwtToken = Cookies.get('token');
    return axios
      .post("https://api.gyftr.com/federalbank-api/api/v1/cart/updateDeliveryDetail", 
        { headers: await  authHeaders(jwtToken) }
      )
      .then((res) => {
        if (res.data?.code === 200) {
            const decrypt = JSON.parse(decryptData(res.data.data));
            res.data.data = decrypt 
            dispatch(actionTypes.cartGetAllSuccess(res.data.data));
          }
      })
      .catch(() => {});
  };
 
 
 