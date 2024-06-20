import { combineReducers } from "redux";
import { globalReducer } from "./GlobalReducer";
import { brandReducer } from "./BrandReducer";
import { loginReducer } from "./LoginReducer";
import { SidebarCategoryReducer } from "./SidebarCategoryReducer";
import { cartReducer } from "./CartReducer";
import { paymentReducer } from "./PaymentReducer";
import { homeReducer } from "./HomeReducer";
import { transactionReducer } from "./TransactionReducer";
import { logoutReducer } from "./LogoutReducer";

const reducers = combineReducers({
    globalInfo: globalReducer,
    brandInfo: brandReducer,
    loginInfo: loginReducer,
    categoryInfo: SidebarCategoryReducer,
    cartInfo: cartReducer,
    paymentInfo: paymentReducer,
    homeInfo: homeReducer,
    transactionInfo: transactionReducer,
    logoutInfo: logoutReducer
    
})

export default reducers;
