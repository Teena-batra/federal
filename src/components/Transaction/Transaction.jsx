import React, { Fragment, useEffect, useState } from "react";
import * as transactionActionCreator from "../../Redux/Actions/ActionCreator/TransactionAction";
import { connect } from "react-redux";
import { OtpInput } from "otp-box-react";
import Cookies from "js-cookie";
import moment from "moment";

function Transaction(props) {
  const { transactionData } = props;

  
   console.log("transaction===========", transactionData);
  
  //const txn_token = Cookies.get('txn_token');
  

  const [state, setState] = useState({ otp: new Array(6).fill("") });
  const  [month, setMonth] = useState("All");

  const onChangeOtpHandler = (otpvalues, event, index) => {
    setState({ ...state, otp: otpvalues });
  };


    const handleClick = (id) => {
        document.getElementById(id).classList.toggle("open_trans")
    }


  useEffect(() => {
    if(!Cookies.get('txn_token')) {
         props.transactionAction({otp: ""});
    } else if(Cookies.get('txn_token')) {
        props.transactionAction({ txn_token: Cookies.get('txn_token')});
    }
  }, [Cookies.get('txn_token')])


  useEffect(() => {
    props.transactionAction({
        filter: month,
        txn_token: Cookies.get('txn_token')
    })
  },[month])

  return (
    <>
      
      {transactionData?.code === 200 ?  (
        <section className="transaction_page my-3 my-md-4">
          <div className="container-lg">
            <div className="row">
              <div className="col-12 fs-18 fw-600">Transaction History</div>
              <div className="col-12 mt-3">
                <div className="border border-primary-2 p-2 p-md-3">
                  <div className="row justify-content-between">
                    <div className="col-md-8 col-4">
                      <div className="btn-group w-100 custom_drop">
                        <button
                          type="button"
                          className="border-0 text-start bg-transparent w-100 dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          onChange={()=> setMonth("1")}
                        >
                          1 month
                        </button>
                        <ul className="list-inline custome-check dropdown-menu">
                          <li className="list-inline-item">
                            <input
                              type="radio"
                              name="discount_filter"
                              id="all"
                              defaultChecked=""
                              onChange={()=> setMonth("all")}
                              
                            />
                            <label htmlFor="all">All</label>
                          </li>
                          <li className="list-inline-item">
                            <input
                              type="radio"
                              name="discount_filter"
                              id="three_mon"
                              onChange={()=> setMonth("3")}

                            />
                            <label htmlFor="three_mon" >3 months</label>
                          </li>
                          <li className="list-inline-item">
                            <input
                              type="radio"
                              name="discount_filter"
                              id="six_mon"
                              onChange={()=> setMonth("6")}
                            />
                            <label htmlFor="six_mon">6 months</label>
                          </li>
                          <li className="list-inline-item">
                            <input
                              type="radio"
                              name="discount_filter"
                              id="this_yrs"
                              onChange={()=> setMonth("year")}
                            />
                            <label htmlFor="this_yrs">This Year</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-4 col-8">
                      <div className="searh_header position-relative">
                        <input
                          type="text"
                          placeholder="Search Brand/Denomination"
                          className="form-control"
                        />
                        <div className="reset_frm">
                          <i className="fa fa-times" />
                        </div>
                        <button type="button" className="search_btn">
                          <i className="fa fa-search px-1 text-primary" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row fs-14 mt-3 mx-0 text-uppercase">
                    <div className="col-3">Order No.</div>
                    <div className="col-3 text-center">Amount</div>
                    <div className="col-3 text-center">Date</div>
                    <div className="col-3 text-center">Status</div>
                  </div>
                  {transactionData?.data?.map((item, index) => {
                            return (<>
                  <div className="row mt-3 "  id={`${item.order_number}`}>
                 
                    <div className="col-12">
                       

                    
                        <div className="trans_list_outer bg-light p-2 p-md-3 trans_hrd cursor-pointer" onClick={()=> {handleClick(`${item.order_number}`)}}   key={index}>
                        
                            
                        <div className="row fs-14">
                          <div className="col-3">{item.order_number}</div>
                          <div className="col-3 text-center">₹{item.cash}</div>
                          <div className="col-3 text-center">{moment.utc(item.order_on).format('DD/MM/YYYY')}</div>
                          <div className="col-3 text-center position-relative">
                            {item.order_status === "C" || item.order_status === "V" && (

                           
                            <div className="delivered d-inline-block">
                              Delivered
                            </div>
                             )}
                              {item.order_status === "I" || item.order_status === "F" && (

                           
                            <div className="delivered failed_trans d-inline-block">
                            Failed
                            </div>
                                )}
                            <div className="right_arr">
                              <i className="fa-solid fa-chevron-right" />
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className="trans_inner_list p-2 p-md-3 position-relative">
                        <div className="row">
                          <div className="col-md col-8 mb-2 mb-md-0">
                            <div className="fs-12">Brand</div>
                            <div className="fs-14 fw-500">
                              {item.brand_name}
                            </div>
                          </div>
                          <div className="col-md text-end text-md-center col-4">
                            <div className="fs-12">Value</div>
                            <div className="fs-14 fw-500">₹{item.face_value}</div>
                          </div>
                          <div className="col-md col-6 text-start text-md-center">
                            <div className="fs-12">Voucher Code</div>
                            <div className="fs-14 fw-500">{"-"}</div>
                          </div>
                          <div className="col-md col-2 text-center text-md-center px-0">
                            <div className="fs-12">Pin</div>
                            <div className="fs-14 fw-500">------</div>
                          </div>
                          <div className="col-md col-4 text-end ps-0 ps-md-2">
                            <div className="fs-12">Expiry</div>
                            <div className="fs-14 fw-500">{"-"}</div>
                          </div>
                        </div>

                      </div>
                      
                      
                     
                    </div>
                    
                  </div>
                  </>)
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (<div
      className="modal fade"
      id="oppMod"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-transparent border-0">
          <div className="modal-body loginMod rounded">
            <div className="row">
              <div className="col-12 text-end">
                <span className="cursor-pointer" data-bs-dismiss="modal" onClick={()=> setState({ otp: new Array(6).fill("") })}>
                  <img src="/images/cross_mod.png" alt=""  />
                </span>
              </div>
              <div className="col-12 text-white text-center">
                <div className="fs-20 mt-3">OTP Sent on XXXXXXXX98</div>
              </div>
              <div className="col-12 mt-4">
                <div className="otp_box">
                  <form action="" className="otp-form">
                    <OtpInput
                      name="otp"
                      className="otp-field"
                      placeholder=" "
                      otpvalue={state.otp}
                      onChangeOtpHandler={onChangeOtpHandler}
                    />
                    <input
                      className="otp-value"
                      type="hidden"
                      name="opt-value"
                    />
                  </form>
                  <div className="text-end fs-13 mt-2 pe-2">
                    <div
                      id="timer"
                      className="text-uppercase text-primary-2"
                    >
                      <span className="text-white">Resend OTP in:</span>{" "}
                      <span className="text-primary-2" id="time">
                        00:30
                      </span>{" "}
                      Sec
                    </div>
                    <div id="show_dv" style={{ display: "none" }}>
                      <span className="cursor-pointer text-primary-2">
                        <u>Resend OTP</u>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 my-4 d-grid">
                <a
                  type="button"
                  className="btn btn-light rounded-pill text-primary py-2"
                  onClick={() => {
                    props.transactionAction({  otp: state.otp.join("") });
                  }}
                >
                  SUBMIT
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)}
    </>
  );
}

const mapStateToProps = (state) => ({
  transactionData: state.transactionInfo.transactionStore
});

const mapDispatchToProps = (dispatch) => ({
  transactionAction: (payload) =>
    dispatch(transactionActionCreator.transactionAction(payload))

});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
