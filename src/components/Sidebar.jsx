import React, {Fragment, useEffect} from 'react'
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as logoutActionCreator from "../Redux/Actions/ActionCreator/LogoutAction"
import * as SidebarActionCreator from "../Redux/Actions/ActionCreator/SideBarAction";
import Cookies from "js-cookie"
import * as loginActionCreator from "../Redux/Actions/ActionCreator/LoginAction"

function Sidebar(props) {
  const {userInfoData, navListData } = props;
  // console.log("userInfoData===========",userInfoData);

  const handleClick = () => {
    Cookies.remove('token');
    Cookies.remove('txn_token');
    props.logoutAction();
  }


  return (
    <Fragment>
        <div
      className="offcanvas offcanvas-start navigationSlide"
      tabIndex={-1}
      id="slideMenu"
      aria-labelledby="slideMenuLabel"
      data-bs-toggle="offcanvas"
    >
      <div className="pb-4 border-bottom border-light">
        <div className="text-end pe-2 pt-2">
          <span
            className="cursor-pointer"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <img src="/images/cross_mod.png" alt="" />
          </span>
        </div>
        <div className="row m-0 align-items-center ps-2">
          <div className="col-auto p-2">
            <div className="name_dv">{userInfoData?.name?.charAt(0)}</div>
          </div>
          <div className="col text-white">
            <h5 className="mb-1">
              <Link to="/profile" className="text-white fs-18" onClick={()=> {props.profileAction()}}>
                 {userInfoData.name}
              </Link>
            </h5>
            <span className="text-white edit_btn cursor-pointer" data-bs-toggle="modal" data-bs-target="#editprofile" onClick="closeNavHandler()"><i className="fa-solid fa-pencil"></i> Edit</span>
          </div>
        </div>
      </div>
      <div className="mid_slide">
        <ul>
          <li>
            {/* <a className="cate_slide">CATEGORIES</a> */}
            <div className="cate_Aslide_inner">
              <div className="row mx-0">
                <div className="col-12 px-0">
                {navListData.map((data, index) => {
                  return (
                    
                  <ul key={index}>
                    <li >
                      <Link to={"/category/"+data.slug}>{data.name}</Link>
                    </li>
                   
                  </ul>
                  )}) }
                </div>
              </div>
            </div>
          </li>
          <li>
            <Link to="/discount" >DISCOUNT</Link>
          </li>
          <li>
            <Link to="/transaction">MY TRANSACTIONS</Link>
          </li>
          <li>
            <Link to="https://www.gvhelpdesk.com/" target="_blank">
              CONTACT US
            </Link>
          </li>
        </ul>
      </div>
      <div class="text-center logout_btn">
            <Link to="/" type="button" class="btn btn-outline-light px-5 fs-14 text-uppercase" onClick={()=> {handleClick()}}>Logout</Link>
        </div>
    </div>
    </Fragment>
  )
}



const mapStateToProps = (state) => ({
  userInfoData: state.loginInfo.userInfoStore,
  navListData: state.globalInfo.navListStore,
  categoryData: state.categoryInfo.categoryStore,
  discountData: state.categoryInfo.discountStore
})

const mapDispatchToProps = (dispatch) => ({
  discountAction: (payload) =>
    dispatch(SidebarActionCreator.discountAction(payload)),
  logoutAction: () =>
    dispatch(logoutActionCreator.logoutAction()),
  profileAction: () => 
    dispatch(loginActionCreator.profileAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
