import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as cartActionCreator from '../../Redux/Actions/ActionCreator/CartAction';

function EditDetails(props) {
    const {cartData} = props;

    const[values, setValues] = useState({
        name: "",
        email: "",
        phone: ""
    })
    console.log(values)
    
    useEffect(() => {
        if(cartData && cartData.length > 0){
            setValues({
                name: cartData[0].cart_delivery_name || "",
                email: cartData[0].cart_delivery_email || "",
                phone: cartData[0].cart_delivery_phone || ""
            })

        }
        
    },[cartData])
    
    const handleChnage = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }


  return (
    <Fragment>
        
      <div
        className="modal fade"
        id="chnageDetails"
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
                    CHANGE DETAILS
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="rounded floatingInner position-relative mb-4">
                    <input
                      type="text"
                      className="form-control rounded-pill bg-transparent floatingInput"
                      placeholder=" "
                      name="name"
                      onChange={handleChnage}
                      Value={values.name}
                    />
                    <label className="floatingLabel" htmlFor="entrPromo">
                      Full Name
                    </label>
                  </div>
                  <div className="rounded floatingInner position-relative mb-4">
                    <input
                      type="text"
                      className="form-control rounded-pill bg-transparent floatingInput"
                      placeholder=""
                      name="email"
                      onChange={handleChnage}
                      Value={values.email}
                      
                    />
                    <label className="floatingLabel" htmlFor="entrPromo">
                      Email ID
                    </label>
                  </div>
                  <div className="rounded floatingInner position-relative">
                    <input
                      type="number"
                      className="form-control rounded-pill bg-transparent floatingInput"
                      placeholder=" "
                      name="phone"
                      onChange={handleChnage}
                      Value={values.phone}
                      disabled={true}
                    />
                    <label className="floatingLabel" htmlFor="entrPromo">
                      Mobile No.
                    </label>
                  </div>
                </div>
                <div className="col-12 my-4 text-center">
                  <button
                    type="button"
                    className="btn btn-light rounded-pill text-primary py-2 px-5"
                    onClick={() => {
                        
                        props.updateDeliveryDetailAction({ 
                            cartItemId: null,
                            name: values.name,
                            mobile: "9588134718",
                            email: values.email
                        })
                        window.$("#chnageDetails").modal("hide");
                    }}
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </Fragment>
  );
}


const mapStateToProps = (state) => ({
    cartData: state.cartInfo.cartStore,
});

const mapDispatchToProps = (dispatch) => ({
    updateDeliveryDetailAction: (payload) => 
        dispatch(cartActionCreator.updateDeliveryDetailAction(payload)),
})
export default connect(mapStateToProps, mapDispatchToProps)(EditDetails);
