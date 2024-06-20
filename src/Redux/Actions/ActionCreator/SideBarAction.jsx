import axios from "axios";
import * as actionTypes from "../ActionTypes"

export const SideBarCategoryAction = (payload) => async (dispatch, getState, api) => {
    return axios
    .get(`https://api.gyftr.com/federalbank-api/api/v1/categories/brands/${payload.slug}`)
    .then((res) => {
        if (res.data?.code === 200) {
            dispatch(actionTypes.sideBarCategorySuccess(res.data.data));
          }
    })
    .catch(() => {});
}


export const discountAction = () => async (dispatch, getState, api) => {
    return axios
      .get("https://api.gyftr.com/federalbank-api/api/v1/offers/discount")
      .then((res) => {
        if (res.data?.code === 200) {
          dispatch(actionTypes.discountSuccess(res.data.data));
        }
      })
      .catch(() => {});
  }
  