import { Fragment, useEffect } from 'react'
import './App.css'
import HomeBodyContent from './ScreenPage/Home/Home'
import Brand from "./ScreenPage/Brand/Brand"
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import Header from "../src/components/Header"
import * as globalActionCreator from "./Redux/Actions/ActionCreator/globalAction"
import {connect} from "react-redux"
import Categories from './ScreenPage/Category/Categories'
import Login from './components/Login/Login'
import * as LoginActions from "./Redux/Actions/ActionCreator/LoginAction"
import Cookies from "js-cookie"
import Sidebar from './components/Sidebar'
import Cart from './ScreenPage/Cart/Cart'
import Discount from './ScreenPage/Discount/Discount'
import Thankyou from './ScreenPage/Payment/Thankyou'
import Transaction from './components/Transaction/Transaction'
import Profile  from './ScreenPage/Profile/Profile'
import Navbar from './components/navbar'

const HeaderLayout = () => (
  <Fragment>
    <Header />
    <Sidebar />
    <Outlet />
    <Login />
  </Fragment>
);

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: "/",
        element: < HomeBodyContent />
      },
      {path: "/discount",
        element: <Discount />
      },
      {
        path: "/transaction",
        element: <Transaction />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/category/:slug",
        element: <Categories />
      
      },
      {
        path: "/payment/:slug",
        element: <Thankyou />
      },
      {
        path: "/brand/:slug",
        element: <Brand />
      
      }, 
      
      
    ],
  },
]);

function App(props) {
  
  useEffect(() => {
   props.navListAction()
   const token = Cookies.get('token');

   if(token){
    props.profileAction({token})
   }
  }, [])

  return <RouterProvider router={router} />
}


const mapDispatchToProps = (dispatch) => ({
  navListAction: () => dispatch(globalActionCreator.navListAction()),
  profileAction: (payload) => dispatch(LoginActions.profileAction(payload))
  
});

export default connect(null, mapDispatchToProps)(App)
