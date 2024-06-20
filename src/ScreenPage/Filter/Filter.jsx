import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import * as SidebarActionCreator from "../../Redux/Actions/ActionCreator/SideBarAction";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { filterHandler } from "../../utils/DataEncryptDecrypt"

function Filter(props) {
    const {discountData} = props;

    


    // const banner = categoryData?.products ? Object.values(JSON.parse(categoryData?.products[0]?.category_banner_image)):[];

    const [selectedDiscount, setSelectedDiscount] = useState('');
    const [redemptionType, setRedemptionType] = useState('');
    const [offerType, setOfferType] = useState(''); 

    // const newData = discountData?.length ? filterHandler(discountData, selectedDiscount, redemptionType, offerType) : []
      //========================= Filtering based upon discounts and redemption type ==========================================
      let filteredBrands= []
      filteredBrands = discountData?.products?.filter((el)=>{
        
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
  return (
    <Fragment>
       
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
                <div className="row mt-4 mb-3 mb-md-0">
                  <div className="col-12 text-center">
                    <button
                      type="button"
                      className="btn btn-primary px-5 rounded-pill"
                    >
                      LOAD MORE
                    </button>
                  </div>
                </div>
              </div>
            
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
    categoryData: state.categoryInfo.categoryStore,
    discountData: state.categoryInfo.discountStore
  });

const mapDispatchToProps = (dispatch) => ({
    SideBarCategoryAction: (payload) =>
      dispatch(SidebarActionCreator.SideBarCategoryAction(payload))
});
  

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

