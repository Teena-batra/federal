import React from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux';
import * as cartActionCreator from '../../Redux/Actions/ActionCreator/CartAction';
import { Link } from 'react-router-dom';
import { useCalHook } from '../../Custom_Hooks/useCalHook';

function CartSummary(props) {
  const {cartData} = props;

  // const calFun =()=>{
  //   let total = 0;
  //   let savings = 0;
  //   cartData.forEach((el) => {
  //     total += el.product_price*el.cart_item_qty
  //     savings +=  (el.promocode_offer_type === 'DIS' ? el.product_price*el.cart_item_qty*el.promocode_value/100 : 0)
  //   })
  //   return {totalprice:total,totalSaving:savings}
  //  }

  const {totalprice, totalSaving} = useCalHook();
  console.log("==========totalPrice",totalprice);
  
  return (
    <Fragment>
            <div className="col-md-4 p-3 d-none d-md-block">
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
                    <div className="summery_list">
                    {cartData?.map((item,index) => {
                          return (

                          <>
                      <div className="p-2" key={index}>
                        
                        <div className="d-flex align-items-center justify-content-between mt-1">
                          <div>{item.brand_name}</div>
                          <div className="cursor-pointer text-danger">
                            <i className="fa-solid fa-trash" onClick={()=> props.cartItemRemoveAction({cartItemId: item.cart_item_id})}/>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-3 mb-1 qty_summery">
                          <div>₹{item.product_price}</div>
                          <div className="qty_outer">
                            <div className="qtySelector rounded-pill d-inline-block">
                              <div className="decreaseQty" onClick={()=> {
                                item.cart_item_qty > 1 ? 
                                props.cartItemUpdateAction({ cart_item_id: item.cart_item_id, type: 0, quantity: 1 }) : 
                                props.cartItemRemoveAction({cartItemId: item.cart_item_id})
                              }}/>
                              <input
                                type="text"
                                className="qtyValue"
                                value={item.cart_item_qty}
                              />
                              <div className="increaseQty" onClick={()=> props.cartItemUpdateAction({ cart_item_id: item.cart_item_id, type: 1, quantity: 1 })} />
                            </div>
                          </div>
                          <div className="text-primary">₹{totalprice}</div>
                        </div>
                       
                      </div>
                      {item.promocode_offer_type === "DIS" && (<>
                     
                      <div className="d-flex align-items-center justify-content-between bg-light-2 p-2">
                        <div>{item.promocode_value}% Discount</div>
                        <div>₹{parseFloat((item.product_price*item.promocode_value)/100)}</div>
                      </div>
                    </>)}
                      </>
                        )
                      })}
                    </div>
                    {/* <div className="summery_list">
                      <div className="p-2">
                        <div className="d-flex align-items-center justify-content-between mt-1">
                          <div>Barbeque Nation</div>
                          <div className="cursor-pointer text-danger">
                            <i className="fa-solid fa-trash" />
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-3 mb-1 qty_summery">
                          <div>₹1000</div>
                          <div className="qty_outer">
                            <div className="qtySelector rounded-pill d-inline-block">
                              <div className="decreaseQty" />
                              <input
                                type="text"
                                className="qtyValue"
                                defaultValue={1}
                              />
                              <div className="increaseQty" />
                            </div>
                          </div>
                          <div className="text-primary">₹1000</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between bg-light-2 p-2">
                        <div>2.5% Discount</div>
                        <div>₹ 25</div>
                      </div>
                    </div> */}
                    <div className="p-2">
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <div>Total Value</div>
                        <div className="text-nowrap">₹{totalprice}</div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-4">
                        <div>You Save</div>
                        <div className="text-nowrap text-success">₹{totalSaving}</div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-4 text-primary mb-2">
                        <div>You Pay</div>
                        <div className="text-nowrap">₹{totalprice - totalSaving}</div>
                      </div>
                      <div className="d-grid my-4 border-top-dashed pt-4">
                        <Link
                          to="/cart"
                          type="button"
                          className="btn btn-primary rounded-pill text-uppercase"
                          
                        >
                          View / Edit Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  cartData: state.cartInfo.cartStore,
});

const mapDispatchToProps = (dispatch) => ({
  cartItemAction: (payload) => 
      dispatch(cartActionCreator.cartItemAction(payload)),
  cartItemRemoveAction: (payload) => 
    dispatch(cartActionCreator.cartItemRemoveAction(payload)),
  cartItemUpdateAction: (payload) => 
    dispatch(cartActionCreator.cartItemUpdateAction(payload)),
  
  
}); 

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
