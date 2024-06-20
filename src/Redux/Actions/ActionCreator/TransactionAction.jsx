import axios from "axios";
import * as actionTypes from "../ActionTypes"
import {decryptData, encryptData} from "../../../utils/DataEncryptDecrypt"
import Cookies from "js-cookie";

export const transactionAction = (payload) => async (dispatch, getState, api) => {
    const token = Cookies.get("token");
    const txnToken = Cookies.get("txn_token");
    console.log("======", payload)
    return axios
    .post(`https://api.gyftr.com/federalbank-api/api/v1/order/allorders`, {encryptedBody: encryptData(JSON.stringify({...payload, txn_token: txnToken || null, filter: "6MONTH"}))}, {
        headers: {
            token: token
        }
    })
    .then((res) => {
        console.log("=========", res.data)
        if (res.data?.code === 201) {
            window.$("#oppMod").modal("show");
            dispatch(actionTypes.transactionSuccess({code:201}));
        }else if(res.data?.code === 200){                        
            const decrypt = JSON.parse(decryptData(res.data.data.data));
            res.data.data.data = decrypt
            dispatch(actionTypes.transactionSuccess({code: 200,...res.data.data}));
            
            if(payload.otp) {
            Cookies.set('txn_token', res.data.data.txns_token);
            window.$("#oppMod").modal("hide")
            }
            
            


          }
    })
    .catch(() => {});
}