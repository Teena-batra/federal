import * as actionConstant from "../ActionConstant"

export const navListSuccess = (payload) => ({
    type: actionConstant.NAV_LIST_SUCCESS, payload
})

export const brandListSuccess = (payload)=> ({
    type:actionConstant.BRAND_LIST_SUCCESS, payload
})

export const loginSuccess = (payload) => ({
    type: actionConstant.LOGIN_SUCCESS, payload
})

export const checkMobileSuccess = (payload) => ({
    type: actionConstant.CHECK_MOBILE_SUCCESS, payload
})

export const profileSuccess = (payload) => ({
    type: actionConstant.PROFILE_SUCCESS, payload
})

export const sideBarCategorySuccess = (payload) => ({
    type: actionConstant.SIDEBAR_CATEGORY_SUCCESS, payload
})

export const  discountSuccess = (payload) => ({
    type: actionConstant.DISCOUNT_SUCCESS, payload
})

export const addToCartSuccess = (payload) => ({
    type: actionConstant.ADD_TO_CART_SUCCESS, payload
})

export const cartItemSuccess = (payload) => ({
    type: actionConstant.CART_ITEM_SUCCESS, payload
})

export const cartGetAllSuccess = (payload) => ({
    type: actionConstant.GET_ALL_SUCCESS, payload
})

export const createOrderSuccess = (payload) => ({
    type: actionConstant.CREATE_ORDER_SUCCESS, payload
})

export const getOrderSuccess = (payload) => ({
    type: actionConstant.GET_ORDER_SUCCESS, payload
})

export const homeContentSuccess = (payload) => ({
    type: actionConstant.HOME_CONTENT_SUCCESS, payload
})

export const transactionSuccess = (payload) => ({
    type: actionConstant.TRANSACTION_SUCCESS, payload
})

export const logoutSuccess = () => ({
    type: actionConstant.LOGOUT_SUCCESS
})

export const registerSuccess = (payload) => ({
    type: actionConstant.REGISTER_SUCCESS, payload
})



