import axios from "axios";
import * as actionTypes from "../ActionTypes"


export const navListAction = () => async (dispatch, getState, api) => {
  return axios
    .get("https://api.gyftr.com/federalbank-api/api/v1/home/categories")
    .then((res) => {
      if (res.data?.code === 200) {
        dispatch(actionTypes.navListSuccess(res.data.data));
      }
    })
    .catch(() => {});
}
