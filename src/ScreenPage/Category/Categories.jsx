import React, { Fragment, useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Navbar from "../../components/navbar";
import { useParams } from "react-router-dom";
import * as brandActionCreator from "../../Redux/Actions/ActionCreator/BrandAction";
import * as SidebarActionCreator from "../../Redux/Actions/ActionCreator/SideBarAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Categories(props) {
  const { categoryData, brandListData } = props;
  const { slug } = useParams();

  const brandData = brandListData.brand || {};

  useEffect(() => {
    props.brandListAction({ slug });
  }, [slug]);


  const banner = categoryData?.products ? Object.values(JSON.parse(categoryData?.products[0]?.category_banner_image)):[];
  //console.log("category banner", banner);

  const [selectedDiscount, setSelectedDiscount] = useState('');

  const [redemptionType, setRedemptionType] = useState('');

  const [offerType, setOfferType] = useState(''); 

  useEffect(() => {
    props.SideBarCategoryAction({ slug });
  }, [slug]);

  console.log("categoryData=========", categoryData);

    //========================= Filtering based upon discounts and redemption type ==========================================
    let filteredBrands=[]
    filteredBrands = categoryData?.products?.filter((el)=>{
      
      if(selectedDiscount === "upto5" && redemptionType === "ON") return (el.offer_value>=1 && el.offer_value <= 5) && el.redemption_type === "ON"
      else if(selectedDiscount === "upto5" && redemptionType === "OFF") return (el.offer_value>=1 && el.offer_value <= 5) && el.redemption_type === "OFF"
      else if(selectedDiscount === "6-10" && redemptionType === "ON") return (el.offer_value>=6 && el.offer_value <= 10) && el.redemption_type === "ON"
      else if(selectedDiscount === "6-10" && redemptionType === "OFF") return (el.offer_value>=6 && el.offer_value <= 10) && el.redemption_type === "OFF"
      else if(selectedDiscount === "11-25" && redemptionType === "ON") return (el.offer_value>=11 && el.offer_value <= 25) && el.redemption_type === "ON"
      else if(selectedDiscount === "11-25" && redemptionType === "OFF") return (el.offer_value>=11 && el.offer_value <= 25) && el.redemption_type === "OFF"
      else if(selectedDiscount === "26-Above" && redemptionType === "ON") return (el.offer_value>=26 ) && el.redemption_type === "ON"
      else if(selectedDiscount === "26-Above" && redemptionType === "OFF") return (el.offer_value>=26) && el.redemption_type === "OFF"
      else if(selectedDiscount === "upto5") return el.offer_value>=1 && el.offer_value <= 5
      else if(selectedDiscount === "6-10") return el.offer_value>=6 && el.offer_value <= 10
      else if(selectedDiscount === "11-25") return el.offer_value>=11 && el.offer_value <= 25
      else if(selectedDiscount === "26-Above") return el.offer_value>=26 
      else if(redemptionType === "ON") return el.redemption_type === "ON"
      else if(redemptionType === "OFF") return el.redemptionType === "OFF"
      else if(offerType === "OFFER") return el.offer_type === "OFFER"
      else if(offerType === "DIS") return el.offer_type === "DIS"
      else return el;
      
    })
    //console.log("filteredBrands",filteredBrands)


    //const catArray = categoryData?.products?.filter(brand => brand.offer_value <= 5);



  return (
    <Fragment>
      <div className="main_outer position-relative">
        {/* banner section */}
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >

          <div className="carousel-inner">
          {banner?.map((item, index) => {
              //console.log("item===============", item.desk_image);
         return(
            <div className={`carousel-item ${index===0 ? 'active' : '' }`} key={index}>
              
           
             
                <img
                  src={item.desk_image}
                  className="d-none d-md-block w-100"
                  alt="..."
                />
                <img
                  src={item.mob_image}
                  className="d-md-none w-100"
                  alt="..."
                />
             
            </div>
         )
             })}
              
          </div>
          {banner.length>1 && (
            <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
          </>
          )}
        </div>
        {/* banner section end */}

        {/* navigation */}
        <Navbar />
        {/* navigation end */}
        {/* brand page */}
        <section className="discount_page my-2 my-md-4">
          <div className="container-lg">
            <div className="row justify-content-center">
              <div className="col-12 fs-18 mt-2 mt-md-0">
                <div className="d-flex align-items-center justify-content-between">
                  <span>Fashion</span>
                  <span
                    className="d-md-none bg-light-2 d-inline-block px-2 py-1 fs-12 rounded-pill"
                    id="filter_dv"
                  >
                    {" "}
                    <i className="fa-solid fa-filter" /> FILTERS{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="row mt-2 mt-md-4">
              <div className="col-lg-3 col-md-4">
                <div className="border border-light-2 bg-light rounded filter_dv mb-4 mb-md-0">
                  <div className="row">
                    <div className="col-12">
                      <div className="row m-0">
                        <div className="col-12 bg-light-2 rounded-top d-flex align-items-center justify-content-between">
                          <span>Filter</span>
                          <span className="text-primary cursor-pointer p-2 fs-14">
                            <u onClick={() => {setSelectedDiscount(""); setRedemptionType("")}}>Clear</u>
                          </span>
                        </div>
                        <div className="col-12">
                          <div className="border-bottom">
                            <div className="fw-400 pt-3 pb-2">Discounts</div>
                            <ul className="list-inline custome-check mb-3">
                              <li className="list-inline-item">
                                <input
                                  type="checkbox"
                                  name="discount_filter"
                                  id="upto5"
                                  checked={selectedDiscount === "upto5"}
                                  onChange={() => {
                                    setOfferType("");
                                    setSelectedDiscount(selectedDiscount === "upto5"? "" : "upto5");
                                    
                                  }}
                                />
                                <label
                                  htmlFor="upto5"
                                  
                                >
                                  upto5%
                                </label>
                              </li>
                              <li className="list-inline-item">
                                <input
                                  type="checkbox"
                                  name="discount_filter"
                                  id="upto10"
                                  checked={selectedDiscount === "6-10"}
                                  onChange={() => { setOfferType(""); setSelectedDiscount(selectedDiscount === "6-10"? "" : "6-10")}}
                                />
                                <label htmlFor="upto10" >6% - 10%</label>
                              </li>
                              <li className="list-inline-item">
                                <input
                                  type="checkbox"
                                  name="discount_filter"
                                  id="upto25"
                                  checked={selectedDiscount === "11-25"}
                                  onChange={() => { setOfferType(""); setSelectedDiscount(selectedDiscount === "11-25"? "" : "11-25")}}
                                />
                                <label htmlFor="upto25" >11% - 25%</label>
                              </li>
                              <li className="list-inline-item">
                                <input
                                  type="checkbox"
                                  name="discount_filter"
                                  id="upto100"
                                  checked={selectedDiscount === "26-Above"}
                                  onChange={() => { setOfferType(""); setSelectedDiscount(selectedDiscount === "26-Above"? "" : "26-Above")}}
                                />
                                <label htmlFor="upto100" >26% - Above</label>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="border-bottom">
                            <div className="fw-400 pt-3 pb-2">BOGO</div>
                            <ul className="list-inline custome-check mb-3">
                              <li className="list-inline-item">
                                <input
                                  type="checkbox"
                                  name="discount_filter"
                                  id="yes"
                                  checked = { offerType === "OFFER"}
                                  onChange={()=> {setSelectedDiscount(""); setRedemptionType(""); setOfferType(offerType === "OFFER"? "" : "OFFER")}}
                                />
                                <label htmlFor="yes" >YES</label>
                              </li>
                              <li className="list-inline-item">
                                <input
                                  type="checkbox"
                                  name="discount_filter"
                                  id="no"
                                  checked = {offerType === "DIS"}
                                  onChange={()=> {setSelectedDiscount(""); setRedemptionType(""); setOfferType(offerType === "DIS"? "" : "DIS")}}
                                />
                                <label htmlFor="no" >NO</label>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="fw-400 pt-3 pb-2">Brands</div>
                          <ul className="list-inline custome-check mb-3">
                            <li className="list-inline-item">
                              <input
                                type="checkbox"
                                name="discount_filter"
                                id="online"
                                checked={redemptionType === "ON"}
                                onChange={() => {setOfferType(""); setRedemptionType(redemptionType === "ON"? "" : "ON")}}
                              />
                              <label htmlFor="online">ONLINE</label>
                            </li>
                            <li className="list-inline-item">
                              <input
                                type="checkbox"
                                name="discount_filter"
                                id="offline"
                                checked={redemptionType === "OFF"}
                                onChange={() => {setOfferType(""); setRedemptionType(redemptionType === "OFF" ? "" : "OFF")}}
                              />
                              <label htmlFor="offline">OFFLINE</label>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <div className="row row-cols-xl-5 row-cols-md-3 row-cols-2 g-3">
                  {filteredBrands?.map((brand, index) => {
                    //console.log("brand=========",brand);
                    return (
                      <div className="col" key={index}>
                        <Link
                          to={"/brand/"+brand.slug}
                          className="inner_list rounded p-2 text-center d-block"
                        >
                          <div className="position-relative">
                            <img
                              src={brand.smart_image_url}
                              className="w-100 rounded"
                              alt=""
                            />
                            {brand.offer_type === "DIS" && (
                              <div className="discount_strip">
                                {brand.offer_value}% OFF
                              </div>
                            )}
                          </div>
                          <div className="mt-1">
                            <img src={brand.brand_icon_url} alt="" />
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                {/* <div className="row mt-4 mb-3 mb-md-0">
                  <div className="col-12 text-center">
                    <button
                      type="button"
                      className="btn btn-primary px-5 rounded-pill"
                    >
                      LOAD MORE
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        {/* brand page end */}
        {/* footer  */}
        <footer className="bg-primary py-3">
          <div className="container-lg">
            <div className="row">
              <div className="col-md-8 text-center text-md-start">
                <ul className="list-inline m-0 p-0">
                  <li className="list-inline-item">
                    <a href="#" className="text-white text-nowrap fs-14 me-2">
                      About Us
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-white text-nowrap fs-14 me-2">
                      FAQ's{" "}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-white text-nowrap fs-14 me-2">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-white text-nowrap fs-14 me-2">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-white text-nowrap fs-14">
                      Customer Support
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 text-center text-md-end mt-3 mt-md-0">
                <span className="text-white fs-14 pt-1 pe-1">Powered by</span>
                <img src="/images/frt_logo.png" alt="" />
              </div>
            </div>
          </div>
        </footer>
        {/* footer end */}
      </div>

      {/* Modal */}

      {/* <div
        className="modal"
        id="howtouse"
        tabIndex={-1}
        aria-labelledby="howtouseLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-header bg-primary text-white rounded-0 py-2">
              <h5 className="modal-title fw-400">HOW TO USE</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body py-0">
              <div className="owl-slider howToUse p-3">
                <div id="how_to_use" className="owl-carousel px-2">
                  <div className="item">
                    <div className="step_pop position-relative">
                      <h6 className="text-uppercase text-center position-relative">
                        <span className="bg-white px-2 d-inline-block">
                          Step 1
                        </span>
                      </h6>
                    </div>
                    <div className="border">
                      <figure className="p-1">
                        <img src="/images/crousel-1.png" />
                        <figcaption>
                          <p className="mt-2 px-2">
                            Use the outlet locator to locate the nearest outlet
                            that accepts this Gift Voucher.
                          </p>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                  <div className="item">
                    <div className="step_pop position-relative">
                      <h6 className="text-uppercase text-center position-relative">
                        <span className="bg-white px-2 d-inline-block">
                          {" "}
                          Step 2
                        </span>
                      </h6>
                    </div>
                    <div className="border">
                      <figure className="p-1">
                        <img src="/images/crousel-2.png" />
                        <figcaption>
                          <p className="mt-2 px-2">Select your product.</p>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                  <div className="item">
                    <div className="step_pop position-relative">
                      <h6 className="text-uppercase text-center position-relative">
                        <span className="bg-white px-2 d-inline-block">
                          {" "}
                          Step 3
                        </span>
                      </h6>
                    </div>
                    <div className="border">
                      <figure className="p-1">
                        <img src="/images/crousel-3.png" />
                        <figcaption>
                          <p className="mt-2 px-2">
                            Share your Gift Voucher with the cashier at the time
                            of billing &amp; pay the remaining amount by cash or
                            card if required.
                          </p>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                  <div className="item">
                    <div className="step_pop position-relative">
                      <h6 className="text-uppercase text-center position-relative">
                        <span className="bg-white px-2 d-inline-block">
                          {" "}
                          Step 4
                        </span>
                      </h6>
                    </div>
                    <div className="border">
                      <figure className="p-1">
                        <img src="/images/crousel-2.png" />
                        <figcaption>
                          <p className="mt-2 px-2">Select your product.</p>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div
        className="modal"
        id="impins"
        tabIndex={-1}
        aria-labelledby="impinsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-header bg-primary text-white rounded-0 py-2">
              <h5 className="modal-title fw-400">IMPORTANT INSTRUCTION</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body faq_outer">
              <div className="impInstructions">
                <ul className="list-unstyled">
                  <li>
                    Multiple Gift Vouchers <strong>CAN</strong> be used in one
                    bill.
                  </li>
                  <li>
                    Gift Vouchers <strong>CAN</strong> be used during Sale.
                  </li>
                  <li>
                    Gift Vouchers <strong>ACCEPTED</strong> at all Listed
                    Outlets.
                  </li>
                  <li className="not">
                    Gift Vouchers <strong>CANNOT</strong> be used Online.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div
        className="modal"
        id="storeLoc"
        tabIndex={-1}
        aria-labelledby="storeLocLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-header bg-primary text-white rounded-0 py-2">
              <h5 className="modal-title fw-400">STORE LOCATOR</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body faq_outer">
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-12 my-3 locatorForm">
                  <form action="#" method="post">
                    <div className="form-group d-flex">
                      <input
                        type="search"
                        name=""
                        placeholder="Enter City "
                        className="form-control text-muted fs-16 fw-400 rounded-0"
                      />
                      <button
                        type="submit"
                        className="btn btn-primary px-3 px-lg-4 rounded-0 fw-400"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="storeDes">
                <div className="row row-cols-lg-3 row-cols-md-2 g-3 mx-0 storeOuter">
                  <div className="col">
                    <div className="address_outer border p-2 h-100">
                      <address>
                        <h5>C.P.III -3664-03772</h5>
                        <p className="mt-3">
                          BATA SHOE STORE,16, REGD BLDG,CANNAUGHT PLACE,NEW
                          DELHI.PIN-110001.
                          <br />
                          NEW DELHI, <br />
                        </p>
                      </address>
                      <form className="custom-form w-100">
                        <div className="mb-3">
                          <input
                            name="userEmail"
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile"
                            minLength={10}
                            maxLength={10}
                          />
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary fs-14"
                          >
                            SEND THE DETAILS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col">
                    <div className="address_outer border p-2 h-100">
                      <address>
                        <h5>C.P.III -3664-03772</h5>
                        <p className="mt-3">
                          BATA SHOE STORE,16, REGD BLDG,CANNAUGHT PLACE,NEW
                          DELHI.PIN-110001.
                          <br />
                          NEW DELHI, <br />
                          DELHI
                          <br />
                          000-10000000
                        </p>
                      </address>
                      <form className="custom-form w-100">
                        <div className="mb-3">
                          <input
                            name="userEmail"
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile"
                            minLength={10}
                            maxLength={10}
                          />
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary fs-14"
                          >
                            SEND THE DETAILS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col">
                    <div className="address_outer border p-2 h-100">
                      <address>
                        <h5>C.P.III -3664-03772</h5>
                        <p className="mt-3">
                          BATA SHOE STORE,16, REGD BLDG,CANNAUGHT PLACE,NEW
                          DELHI.PIN-110001.
                          <br />
                          NEW DELHI, <br />
                          DELHI
                          <br />
                          000-10000000
                        </p>
                      </address>
                      <form className="custom-form w-100">
                        <div className="mb-3">
                          <input
                            name="userEmail"
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile"
                            minLength={10}
                            maxLength={10}
                          />
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary fs-14"
                          >
                            SEND THE DETAILS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col">
                    <div className="address_outer border p-2 h-100">
                      <address>
                        <h5>C.P.III -3664-03772</h5>
                        <p className="mt-3">
                          BATA SHOE STORE,16, REGD BLDG,CANNAUGHT PLACE,NEW
                          DELHI.PIN-110001.
                          <br />
                          NEW DELHI, <br />
                        </p>
                      </address>
                      <form className="custom-form w-100">
                        <div className="mb-3">
                          <input
                            name="userEmail"
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile"
                            minLength={10}
                            maxLength={10}
                          />
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary fs-14"
                          >
                            SEND THE DETAILS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col">
                    <div className="address_outer border p-2 h-100">
                      <address>
                        <h5>C.P.III -3664-03772</h5>
                        <p className="mt-3">
                          BATA SHOE STORE,16, REGD BLDG,CANNAUGHT PLACE,NEW
                          DELHI.PIN-110001.
                          <br />
                          NEW DELHI, <br />
                          DELHI
                          <br />
                          000-10000000
                        </p>
                      </address>
                      <form className="custom-form w-100">
                        <div className="mb-3">
                          <input
                            name="userEmail"
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile"
                            minLength={10}
                            maxLength={10}
                          />
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary fs-14"
                          >
                            SEND THE DETAILS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col">
                    <div className="address_outer border p-2 h-100">
                      <address>
                        <h5>C.P.III -3664-03772</h5>
                        <p className="mt-3">
                          BATA SHOE STORE,16, REGD BLDG,CANNAUGHT PLACE,NEW
                          DELHI.PIN-110001.
                          <br />
                          NEW DELHI, <br />
                          DELHI
                          <br />
                          000-10000000
                        </p>
                      </address>
                      <form className="custom-form w-100">
                        <div className="mb-3">
                          <input
                            name="userEmail"
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile"
                            minLength={10}
                            maxLength={10}
                          />
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary fs-14"
                          >
                            SEND THE DETAILS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div
        className="modal"
        id="termCon"
        tabIndex={-1}
        aria-labelledby="termConLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-header bg-primary text-white rounded-0 py-2">
              <h5 className="modal-title fw-400">TERMS &amp; CONDITIONS</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body faq_outer">
              1.This is a Bata Insta Gift Voucher (GV) / Gift Card (GC) and
              would be accepted at listed outlets. For Outlet List, please visit
              www.gyftr.com/bata
              <br />
              2.The person who has the Bata GV / GC Code is deemed to be the
              beneficiary.
              <br />
              3.Do inform the cashier that you plan to use the GV / GC for
              making payments before billing.
              <br />
              4.Only the listed Bata outlets at its sole discretion accept the
              GV / GC. Bata may add or remove an outlet without giving any prior
              notice.
              <br />
              5.A maximum of 7 GV / GC can be used in one bill.
              <br />
              6.This is a ONE time use GV / GC.
              <br />
              7.No Credit note / Refund for the unused amount of the GV / GC
              will be given.
              <br />
              8.Bata GV / GC CANNOT be revalidated once expired.
              <br />
              9.Bata GV / GC can be used during sale.
              <br />
              10.Bata GV / GC cannot be redeemed on specific block out dates.
              Bata may add or delete any date on its sole discretion.
              <br />
              11.Any dispute related to the GV / GC should be referred to the
              issuing company and the decision of the issuing company shall be
              final.
              <br />
              12.Bata makes full efforts to accept Insta Gift Vouchers (GV) /
              Gift Card (GC), but on account of any technical / administrative
              reasons an outlet may refuse to accept the same.
              <br />
              13.If an Insta Gift Voucher (GV) /Gift Card (GC) gets blocked on
              account of technical issue, it would get enabled in 72 hours.
              <br />
              14.For any queries / issues related to GV / GC, raise a request at
              www.gvhelpdesk.com
            </div>
          </div>
        </div>
      </div> */}
      {/* Modal */}
      {/* <div
        className="modal fade"
        id="editprofile"
        tabIndex={-1}
        aria-labelledby="loginModLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-transparent border-0">
            <div className="modal-body loginMod rounded">
              <div className="row">
                <div className="col-12 text-end">
                  <span className="cursor-pointer" data-bs-dismiss="modal">
                    <img src="/images/cross_mod.png" alt="" />
                  </span>
                </div>
                <div className="col-12 text-white text-center">
                  <div className="fs-24 fw-500 text-uppercase">
                    Edit Profile
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="rounded floatingInner position-relative mb-4">
                    <input
                      type="text"
                      className="form-control rounded-pill bg-transparent floatingInput"
                      defaultValue="Roushan"
                      placeholder=" "
                    />
                    <label className="floatingLabel" htmlFor="entrPromo">
                      Full Name
                    </label>
                  </div>
                  <div className="rounded floatingInner position-relative mb-4">
                    <input
                      type="text"
                      className="form-control rounded-pill bg-transparent floatingInput"
                      defaultValue="roushan@gmail.com"
                      placeholder=" "
                    />
                    <label className="floatingLabel" htmlFor="entrPromo">
                      Email ID
                    </label>
                  </div>
                  <div className="rounded floatingInner position-relative mb-4">
                    <input
                      type="number"
                      className="form-control rounded-pill bg-transparent floatingInput"
                      defaultValue={9876543210}
                      placeholder=" "
                    />
                    <label className="floatingLabel" htmlFor="entrPromo">
                      Mobile No.
                    </label>
                  </div>
                  <div className="rounded floatingInner position-relative">
                    <input
                      type="date"
                      className="form-control rounded-pill bg-transparent floatingInput"
                      placeholder=" "
                    />
                    <label className="floatingLabel" htmlFor="entrPromo">
                      Date of Birth
                    </label>
                  </div>
                </div>
                <div className="col-12 my-4 text-center">
                  <button
                    type="button"
                    className="btn btn-light rounded-pill text-primary py-2 px-5"
                  >
                    UPDATE PROFILE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  categoryData: state.categoryInfo.categoryStore,
  brandListData: state.brandInfo.brandListStore
});
const mapDispatchToProps = (dispatch) => ({
  SideBarCategoryAction: (payload) =>
    dispatch(SidebarActionCreator.SideBarCategoryAction(payload)),
  brandListAction: (payload) =>
    dispatch(brandActionCreator.brandListAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
