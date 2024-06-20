import axios from "axios";
import * as actionTypes from "../ActionTypes"

export const brandListAction = (payload) => async (dispatch, getState, api) => {
    return axios
    .get(`https://api.gyftr.com/federalbank-api/api/v1/brand/${payload.slug}`)
    .then((res) => {
        if (res.data?.code === 200) {
            dispatch(actionTypes.brandListSuccess(res.data.data));
          }
    })
    .catch(() => {});
}

