import axios from "axios";
import * as actionTypes from "../ActionTypes"
import {decryptData, encryptData} from "../../../utils/DataEncryptDecrypt"
 import Cookies from "js-cookie"

export const createOrderAction = (payload) => async (dispatch, getState, api) => {
   // console.log("payload======", payload);
    const token = Cookies.get('token');
    return axios
      .post("https://api.gyftr.com/federalbank-api/api/v1/order/createorder", { encryptedBody: encryptData(JSON.stringify(payload )) }, { headers: {
        'token': token
      }}
      )
      .then((res) => {
        if (res.data?.code === 200) {
            console.log("==========res",res);
            const decrypt = JSON.parse(decryptData(res.data.formData));
            res.data.formData = decrypt 
            const params = res.data.formData;
            console.log("params=",params) 
            const form = document.createElement('form');
            for (const key in params) {
              const element = document.createElement('input');
              element.value = params[key];
              element.name = key;
              element.type = 'hidden';
              form.appendChild(element);
            }
            form.method = 'POST';
            form.action = res.data.formAction;
            document.body.appendChild(form);
           // console.log("Form==================> ",form);
            form.submit();
            dispatch(actionTypes.createOrderSuccess(res.data.data)); 
          }
      })
      .catch(() => {});
};

export const getOrderAction = (payload) => async(dispatch,getState, api) => {
  const token = Cookies.get('token');
  return axios.post('https://api.gyftr.com/federalbank-api/api/v1/order/getorder', {encryptedBody: encryptData(JSON.stringify(payload )) }, {
   headers: {
     'token': token
   }
 }).then((res) => {
   if (res.data?.code === 200) {
       const decrypt = JSON.parse(decryptData(res.data.data));
       res.data.data = decrypt
       dispatch(actionTypes.getOrderSuccess({pgData: res.data.data, code: 200}));
   }
})
.catch(() => {});
}