import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import Cookies from "js-cookie"

function Header(props) {
  const { userInfoData, cartData, navListData } = props;

  //==================== To Merge tha Array======================================================================

  let mergedArray = [];

  const mergeAll = () => {
    navListData?.map((item) => {
      let catArray = item.brands_name?.split(",");
      let slugArray = item.brands_slug?.split(",");
      catArray.map((brand, index) => {
        mergedArray.push({ brandName: brand, brandslug: slugArray[index] });
      });
    });
  };
 mergeAll();
  

  //=================== Remove duplicate elements =============================================================

  const removeDuplicates = (array, key) => {
    const uniqueArray = new Set();
    return array.filter(item => {
      const keyValue = item[key];
      return uniqueArray.has(keyValue) ? false : uniqueArray.add(keyValue);
    });
  };

  

  let uniqueArray =  removeDuplicates(mergedArray, 'brandName')
   //console.log("sorted",uniqueArray)


  //======================= Sort an array on the basis of key ==============================================
  let new_mergedArray = uniqueArray.sort((a, b) => a.brandName.localeCompare(b.brandName));
   


  //=========================== Auto Suggest Methods====================================================

  const getSuggestions = (value) => {
    const inputValue = String(value)?.trim()?.toLowerCase();
    const inputLength = inputValue.length;

    return new_mergedArray.filter(
      (brand) =>
        brand.brandName.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const getSuggestionValue = (suggestion) => suggestion.brandName;

  const renderSuggestion = (suggestion) => (
    <>
      {/* {console.log(suggestion)} */}
      <Link to={`/brand/${suggestion.brandslug}`}  onClick={() => document.activeElement.onfocusout()}>{suggestion.brandName}</Link>
     
      
    </>
  );

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
   // console.log("event=========", event);
    setValue(newValue);
  };


  const onSuggestionsFetchRequested = ({ value }) => {
    console.log("==========", getSuggestions(value));
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
    setValue("");
  };

  const shouldRenderSuggestions = () => {
    return true;
  };

  // const onSuggestionSelected = (event, {suggestion}) => {
  //   <Link to={`/brand/${suggestion.brandslug}`}></Link>
  //   setValue("")
  //   setSuggestions([])

  // }

  function handleSuggestionClick(suggestion) {
    // Your logic to render the brand goes here
    console.log('Suggestion clicked:', suggestion);
    // For example, redirect to the brand page:
    window.location.href = `/brand/${suggestion.brandslug}`;
}

  const inputProps = {
    placeholder: "Search your favorite brand",
    value,
    onChange: onChange,

    className: "form-control",
  };

  // console.log("value",value)

  return (
    <Fragment>
      <header className="bg-primary pt-md-3">
        <div className="container-lg">
          <div className="row m-0">
            <div className="col-12 bg-white rounded-top px-0 px-md-2">
              <div className="row align-items-center">
                <div className="col-lg col-md-4 col-5 order-1">
                  <div className="d-flex align-items-center">
                    <div
                      className="d-inline-block nav-icon"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#slideMenu"
                      aria-controls="slideMenu"
                    >
                      <span />
                      <span />
                      <span />
                    </div>
                    <Link to="/" className="py-2">
                      <img
                        src="/images/fedral_logo.png"
                        className="d-none d-md-block"
                        alt=""
                      />
                      <img
                        src="/images/fedral_logo_white.png"
                        className="d-md-none"
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-lg col-md-4 order-3 order-md-2 mb-2 mb-md-0">
                  <div className="searh_header position-relative">
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={onSuggestionsClearRequested}
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      
                      shouldRenderSuggestions={shouldRenderSuggestions}
                      // onSuggestionSelected={onSuggestionSelected}
                      // alwaysRenderSuggestions={true}
                      onSuggestionSelected={(event, { suggestion }) => handleSuggestionClick(suggestion)}
                      focusInputOnsuggestionClick={false}
                      inputProps={inputProps}
                    />

                    <div className="reset_frm">
                      <i className="fa fa-times" />
                    </div>
                    <button type="button" className="search_btn">
                      <i className="fa fa-search border-start border-primary px-3 text-primary" />
                    </button>
                  </div>
                </div>
                <div className="col-lg col-md-4 col-7 order-2 order-md-3">
                  <ul className="list-inline m-0 d-flex align-items-center justify-content-end">
                    {/* <li class="list-inline-item me-2 me-md-4">
                                        <div class="d-flex align-md-items-center"> 
                                            <figure class="m-0 cursor-pointer ms-md-4 text-center" data-bs-toggle="modal" data-bs-target="#loginMod">
                                                <img src="images/user.png"  alt="" />
                                                <figcaption class="fs-12 fw-500 text-primary">Login/Signin</figcaption> 
                                            </figure>
                                        </div>
                                    </li> */}
                    <li className="list-inline-item me-2 me-md-4">
                      <div className="d-flex align-md-items-center name_dv">
                        <figure className="m-0 text-md-center text-end">
                          <img
                            src="/images/card.png"
                            className="d-none d-md-inline-block"
                            alt=""
                          />
                          <figcaption className="fs-12 fw-500 text-primary text-nowrap">
                            ₹ 2000
                          </figcaption>
                        </figure>
                        <figure className="m-0 ms-md-4 text-md-center text-end">
                          <img
                            src="/images/user.png"
                            className="d-none d-md-inline-block"
                            alt=""
                          />
                          <figcaption
                            className="fs-12 fw-500 text-primary cursor-pointer"
                            data-bs-toggle="modal"
                            data-bs-target="#loginMod"
                          >
                            {userInfoData.isLogin
                              ? userInfoData.name
                              : "Login/Signin"}
                            {/* Login/Signin */}
                          </figcaption>
                        </figure>
                      </div>
                    </li>
                    <li className="list-inline-item text-center">
                      <Link to="/cart">
                        <figure className="m-0 position-relative cart_dv">
                          <img src="/images/cart.png" alt="" />
                          <figcaption className="fs-12 fw-500 text-primary text-nowrap">
                            My Cart
                          </figcaption>
                          <div className="cart_qty">{cartData?.length}</div>
                        </figure>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  userInfoData: state.loginInfo.userInfoStore,
  cartData: state.cartInfo.cartStore,
  navListData: state.globalInfo.navListStore,
  registerData: state.loginInfo.registerStore
});


export default connect(mapStateToProps)(Header);
