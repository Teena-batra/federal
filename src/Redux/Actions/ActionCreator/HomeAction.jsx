import axios from "axios";
import * as actionTypes from "../ActionTypes"

export const homeContentAction = () => async (dispatch, getState, api) => {
    return axios
    .get(`
    https://api.gyftr.com/federalbank-api/api/v1/home/content`)
    .then((res) => {
        if (res.data?.code === 200) {
            dispatch(actionTypes.homeContentSuccess(res.data.data));
          }
    })
    .catch(() => {});
}

