import React, {Fragment, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import * as paymentActionCreator from "../../Redux/Actions/ActionCreator/PaymentAction"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function Thankyou(props) {
    const {getOrderData} = props;

    const {slug} = useParams();

    useEffect(() => {
        props.getOrderAction({ guid:slug });
      }, [slug]);

      const orderData = getOrderData.code === 200 ? Object.values(getOrderData.pgData) : []
      console.log("getOrderData=========>", orderData.flat())

    return (

    <div>
       {getOrderData.code === 200 && (
    <section className="thankyou_page my-2 my-md-4">
  <div className="container-lg">
   
    <div className="row justify-content-center">
    {(orderData.flat()?.[0]?.order_status === "C" || orderData.flat()?.[0]?.order_status === "V") ? ( 
        <Fragment >

      <div className="col-lg-10">
        <div className="border border-primary-2 bg-light mt-5 rounded">
        
          <div className="row m-0">
           
            <div className="col-12 text-center image_success position-relative">
                
              <div className="bg-white border border-primary-2 p-2 d-inline-block rounded-pill">
                <img src="/images/success.png" alt="" />
              </div>
              <div className="fs-24 text-success fw-600 mt-2">
                Payment Successfull !
              </div>
              <div className="fs-14 fw-500">
                Dear your order {getOrderData?.[0]?.order_number} has been processed successfully.
              </div>
            </div>
            <div className="col-12 list_thnk p-3 position-relative">
                {orderData.flat()?.map((item, index) => {
                    return (<>
               
              <div className="row align-items-center">
                <div className="col-md-2 d-none d-md-block">
                  <div className="border border-primary-2 d-flex align-items-center justify-content-center h-100 bg-white rounded">
                    <img src="/images/logo_14.png" className="rounded" alt="" />
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-12 border-bottom border-primary-2 ps-md-0 pb-3 mb-3">
                      {item.brand_name}
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-md col-6">
                          <div className="fs-12">Value</div>
                          <div className="fs-14 fw-600">₹{item.face_value}</div>
                        </div>
                        <div className="col-md col-6 text-end text-md-center">
                          <div className="fs-12">Voucher Code</div>
                          <div className="fs-14 fw-600">{item.voucher_no}</div>
                        </div>
                        <div className="col-md col-6 text-start text-md-center mt-3 mt-md-0">
                          <div className="fs-12">Pin</div>
                          <div className="fs-14 fw-600">{item.voucher_pin}</div>
                        </div>
                        <div className="col-md col-6 text-end mt-3 mt-md-0">
                          <div className="fs-12">Expiry</div>
                          <div className="fs-14 fw-600">{item.end_date}</div>
                        </div>
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
      <div className="col-lg-12 text-center mt-4">
        <Link
          to="/"
          type="button"
          className="btn btn-primary px-5"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
      </Fragment>
        ): (

        <Fragment>
        <div className="col-lg-10">
          <div className="border border-primary-2 bg-light mt-5 rounded">
            <div className="row m-0">
              <div className="col-12 text-center image_success position-relative">
                <div className="bg-white border border-primary-2 p-2 d-inline-block rounded-pill">
                  <img src="/images/failed.png" alt="" />
                </div>
                <div className="fs-24 text-danger fw-600 mt-2">
                  Transaction Failed !
                </div>
                <div className="fs-14 fw-500">
                  There was some problem with payment processing. Please try once
                  again.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 text-center mt-4">
          <Link 
          to="/cart"
          type="button" className="btn btn-primary px-5">
            TRY AGAIN
          </Link>
        </div>
        </Fragment>
        )}
      </div>
    </div>
  </section>

    )} 
    </div>
  )
}

const mapStateToProps = (state) => ({
    getOrderData: state.paymentInfo.getOrderStore
  });

  const mapDispatchToProps = (dispatch) => ({
    getOrderAction: (payload) =>
      dispatch(paymentActionCreator.getOrderAction(payload))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Thankyou);
