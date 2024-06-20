import React, { useState } from 'react'
import { Fragment } from 'react'
import * as cartActionCreator from '../../Redux/Actions/ActionCreator/CartAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditDetails from './EditDetails';
//import { createOrderAction } from '../../Redux/Actions/ActionCreator/Payment';
import * as paymentActionCreator from "../../Redux/Actions/ActionCreator/PaymentAction"
function Cart(props) {
  const {cartData, userData} = props;
  
  console.log("userData=============", userData);

 const [isGifting, setIsGifting] = useState(false);

 let totalId = []
 const cartItemIds = () => {
    cartData?.map((item, index) => {
        totalId[index] = item.cart_item_id;
    })
 }
 cartItemIds()


 const handleChange = (event) => {
    setIsGifting(event.target.checked);
 }

 
 const calFun =()=>{
  let total = 0;
  let savings = 0;
  cartData.forEach((el) => {
    total += el.product_price*el.cart_item_qty
    savings +=  (el.promocode_offer_type === 'DIS' ? el.product_price*el.cart_item_qty*el.promocode_value/100 : 0)
  })
  return {totalprice:total,totalSaving:savings}
 }


 //console.log("calFun",calFun()?.totalprice)

//   const calculateTotalPrice = (cart) => {
//     return cart.reduce((total, item) => {
//       console.log("item price:===========", item.product_price*item.cart_item_qty)
//       return total + item.product_price * item.cart_item_qty;
//     }, 0);
//   };

//   let total_Price = calculateTotalPrice(cartData);
  
// const calculateTotalSavings = (cart) => {
  
//   return cart.reduce((total, item) => {
//     console.log("item saving=================",((item.product_price*item.promocode_value)/100)*item.cart_item_qty)
//     return total+  parseFloat(((item.product_price*(item.promocode_value || 0))/100)*item.cart_item_qty)
//   },0)
// }

// let total_savings = calculateTotalSavings(cartData);

  return (

    <Fragment>
    <section className="cart_page my-2 my-md-4">
    <div className="container-lg">
      <div className="row">
        <div className="col-12">
          <div className="border border-primary-2 bg-light rounded">
            <div className="row align-items-center">
              <div className="col-lg-9 fs-14">
                <div className="row m-0 py-2">
                  <div className="col-md-4 col-auto">
                    Deliver to : {cartData?.[0]?.cart_delivery_name
}
                  </div>
                  <div className="col-md-4 col-auto text-end text-md-start">
                    Mob : {cartData?.[0]?.cart_delivery_phone}
                  </div>
                  <div className="col-md-4">Email : {cartData?.[0]?.cart_delivery_email}</div>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="p-2 edit_dv text-primary text-center cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#chnageDetails"
                >
                  <i className="fa-solid fa-pencil"   /> Edit Details
                </div>
                {/* <EditDetails /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-12">
              <div className="customCheckbox">
                <input type="checkbox" id="gifting" name="share_loc" onChange={handleChange} />
                <label htmlFor="gifting" className="bg-light-2">
                  <span className="ps-1">I am Gifting</span>{" "}
                </label>
              </div>
            </div>
            {isGifting && (
            <div className="col-12 gifting_box border-top border-light position-relative ">
              <div className="bg-light-2 rounded">
                <div className="row row-cols-1 mx-0">
                  <div className="col p-2">
                    <div className="row m-0">
                      <div className="col-md-4 p-2">
                        <input
                          type="text"
                          className="form-control rounded-pill"
                          // defaultValue="Roushan"
                          placeholder="Recipient's Name…"
                        />
                      </div>
                      <div className="col-md-4 p-2">
                        <input
                          type="text"
                          className="form-control rounded-pill"
                          // defaultValue="rousan@gmail.com"
                          placeholder="Enter Email ID…"
                        />
                      </div>
                      <div className="col-md-4 p-2">
                        <input
                          type="number"
                          defaultValue=""
                          className="form-control rounded-pill"
                          placeholder="Enter Mobile Number…"
                        />
                      </div>
                      <div className="col-md-6 p-2">
                        <div className="giftingSelect h-100">
                          <select
                            name=""
                            className="form-select bg-transparent border-0"
                            id=""
                          >
                            <option value="">Happy Anniversary</option>
                          </select>
                          <div className="gift_bg">
                            <img
                              src="/images/gift_bg-1.png"
                              className="w-100"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 p-2">
                        <div className="giftingSelect h-100">
                          <select
                            name=""
                            className="form-select bg-transparent border-0"
                            id=""
                          >
                            <option value="">Select Message</option>
                          </select>
                          <div className="gift_bg h-100">
                            <textarea
                              name=""
                              id=""
                              className="bg-transparent border-0 w-100 h-100 p-2"
                              placeholder="Or start typing a message here…."
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 p-2 text-center my-1">
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill px-5"
                        >
                          SAVE DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
          <div className="row row-cols-1 mt-4">
            <div className="col">
              <div className="bg-light border border-primary-2 rounded p-md-3">
                
                {cartData?.map((item, index) => {

                return(
                  <>
                  <div className="row mx-0 listing_crt position-relative" key={index}>
                  <div className="col-lg-2 col-md-4 ps-0 d-none d-md-block">
                    <div className="h-100 bg-white border border-primary-2 rounded d-flex align-items-center justify-content-center">
                      <Link to="#">
                        <img src={item.brand_icon_url} alt="" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-10 col-md-8 pe-0">
                    <div className="row row-cols-1">
                      <div className="col ps-1">
                        
                        <div className="d-md-flex align-items-center justify-content-between pe-3 pe-md-0">
                          <div>{item.brand_name}</div>
                          <div className="text-nowrap fs-18 text-primary d-none d-md-block">
                            ₹{(item.product_price*item.cart_item_qty) - (item.product_price*item.promocode_value*item.cart_item_qty)/100}
                          </div>
                        </div>
                      </div>
                      <div className="col ps-1 mt-2">
                        <div className="d-flex">
                        {item.promocode_offer_type === "DIS" && (
                          <>
                          <span className="text-nowrap fs-16">
                            Discount/Offer :{" "}
                          </span>
                          <span className="ps-2 ms-2 border-start text-success fs-16">
                            
                              {item.promocode_value} % Off
                            
                          </span>
                          </>
                        )}
                        </div>
                      </div>
                      <div className="col ps-1 mt-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="fs-14 text-muted d-flex">
                            <div className="text-center">
                              <div className="fs-14 mb-1">Value</div>
                              <div className="text-dark fw-600">{item.product_price}</div>
                            </div>
                            <div className="qty_summery ms-4">
                              <div className="text-center">Quanity</div>
                              <div className="qty_outer mt-1">
                                <div className="qtySelector rounded-pill d-inline-block">
                                  <div className="decreaseQty" onClick={()=> {
                                    item.cart_item_qty > 1 ? 
                                    props.cartItemUpdateAction({ cart_item_id: item.cart_item_id, type: 0, quantity: 1 }):
                                    props.cartItemRemoveAction({cartItemId: item.cart_item_id})


                                }} />
                                  <input
                                    type="text"
                                    className="qtyValue"
                                    // defaultValue={1}
                                    value={item.cart_item_qty}

                                  />
                                  <div className="increaseQty" onClick={()=> props.cartItemUpdateAction({ cart_item_id: item.cart_item_id, type: 1, quantity: 1 })}/>
                                </div>
                              </div>
                            </div>
                            <div className="text-center ps-5">
                              <div className="fs-14 mb-1">Savings</div>
                              <div className="text-dark fw-600">{parseFloat((item.product_price*item.promocode_value)/100)}</div>
                            </div>
                          </div>
                          <div className="text-primary fs-15 mt-2 cursor-pointer delete_ic">
                            <i className="fa fa-trash" aria-hidden="true" />{" "}
                            <span className="d-none d-md-inline-block" onClick={()=>{props.cartItemRemoveAction({ cartItemId: item.cart_item_id })}}>
                              Delete
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </>
                  )})}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 my-4 my-md-0">
          <div className="brandSummery">
            <div className="card border-0">
              <div className="card-header bg-primary d-flex align-items-center justify-content-between text-white">
                <span>Cart Summary</span>
                <div className="cart_dv position-relative">
                  <img src="/images/cart.png" alt="" />
                  <div className="cart_qty">{cartData?.length}</div>
                </div>
              </div>
              <div className="card-body border border-primary-2 p-0">
                <div className="p-2">
                
                    <div className="d-flex align-items-center justify-content-between mt-2">
                    <div>Total Value</div>
                    
                   
                    <div className="text-nowrap" > ₹{calFun()?.totalprice} </div>
                 </div>
                  <div className="d-flex align-items-center justify-content-between mt-4">
                    <div>You Save</div>
                    <div className="text-nowrap text-success">₹{calFun()?.totalSaving}</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-4 text-primary mb-2">
                    <div>You Pay</div>
                    <div className="text-nowrap">₹{calFun()?.totalprice-calFun()?.totalSaving}</div>
                  </div>
                  <div className="my-4 border-top-dashed pt-3">
                    
                    <div className="customCheckbox">
                      <input
                        type="checkbox"
                        id="iagree"
                        name="share_loc"
                        defaultChecked=""
                      />
                      <label htmlFor="iagree">
                        <span className="ps-1">
                          I agree to the{" "}
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#termCon"
                          >
                            Terms and Conditions
                          </a>
                        </span>
                      </label>
                    </div>
                    <div className="customCheckbox">
                      <input
                        type="checkbox"
                        id="sms_share"
                        name="share_loc"
                        defaultChecked=""
                      />
                      <label htmlFor="sms_share">
                        <span className="ps-1">Share on Whatsapp + Email</span>{" "}
                      </label>
                    </div>
                    <div className="d-grid mt-3">
                      <button
                        
                        type="button"
                        className="btn btn-primary rounded-pill text-uppercase"
                        onClick={()=>{props.createOrderAction({cart_item_ids: totalId,
                              name: userData?.name,
                              mobile: userData?.phone,
                              email: userData?.email,
                              whatsapp: true,
                              points: 0
                          })}}

                  

                      >
                      Pay now
                      </button>
                    </div>
                          

                  </div>
                  
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <EditDetails />
  </Fragment>
  
  )
}

const mapStateToProps = (state) => ({
  cartData: state.cartInfo.cartStore,
  userData: state.loginInfo.userInfoStore
});

const mapDispatchToProps = (dispatch) => ({
  cartItemAction: (payload) => 
      dispatch(cartActionCreator.cartItemAction(payload)),
  cartItemRemoveAction: (payload) => 
    dispatch(cartActionCreator.cartItemRemoveAction(payload)),
  cartItemUpdateAction: (payload) => 
    dispatch(cartActionCreator.cartItemUpdateAction(payload)),
  createOrderAction: (payload) => 
    dispatch(paymentActionCreator.createOrderAction(payload))
  
  
}); 

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
