import React, { useEffect, useState } from "react";
import validations from "./LoginValidation";
import { OtpInput } from "otp-box-react";
import { connect } from "react-redux";
import * as loginActionCreator from "../../Redux/Actions/ActionCreator/LoginAction";

function Login(props) {
  const { checkmobData,userData } = props;
  const [onStep, setOnStep] = useState(1);
  const [values, setValues] = useState({
    email: "",
    name: "",
    mobileNumber: "",
  });

  const [errorMessage, setErrorMessage] = useState({});
  const [state, setState] = useState({ otp: new Array(6).fill("") });

  useEffect(() => {
    if (checkmobData?.status) {
      //console.log("=========", checkmobData)
      if (checkmobData?.status === "A") setOnStep(3);
      else setOnStep(2);
    }
  }, [checkmobData?.status]);

  const onChangeOtpHandler = (otpvalues, event, index) => {
    setState({ ...state, otp: otpvalues });
  };

  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    setErrorMessage(validations(values));
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      errorMessage.mobileNumber === "" &&
      errorMessage.email === "" &&
      errorMessage.name === ""
    ) {
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter valid mobile number and email and name.");
    }
    props.registerAction({
      name: values.name,
      mobile: values.mobileNumber,
      email: values.email,
      isResend: false
  })
  
    setOnStep(3);
  };

  //
  const handleSubmit2 = (e) => {
    if (state.otp.join("").length < 6) {
      setErrorMessage("Please enter valid otp");
    } else {
      if(checkmobData?.status === "A"){
        props.loginAction({
          mobile: values.mobileNumber,
          otp: state.otp.join(""),
        });
      }else if(checkmobData?.status === "N"){
        props.registerAction({
          name: values.name,
          email: values.email,
          mobile: values.mobileNumber,
          otp: state.otp.join("")
        })
      }
      
    }
   // setState({ otp: new Array(6).fill("") })


    // setValues({
    //   name: "",
    //   email: "",
    //   mobileNumber: ""
    // })

    //setOnStep(1);

    window.$("#loginMod").modal("hide");
  };

  // useEffect(()=>{
  //     if(onStep === 2){
  //         window.$('#loginMod').modal('hide')
  //         window.$('#oppMod').modal('show')
  //     }

  // },[onStep])

  return (
    <>
      <div
        className="modal fade"
        id="loginMod"
        tabIndex={-1}
        aria-labelledby="loginModLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-transparent border-0">
            {onStep === 1 ? (
              <div className="modal-body loginMod rounded">
                <div className="row">
                  <div
                    className="col-12 text-end"
                    onClick={() =>
                      setValues({
                        email: "",
                        name: "",
                        mobileNumber: "",
                      })
                    }
                  >
                    <span className="cursor-pointer" data-bs-dismiss="modal">
                      <img src="/images/cross_mod.png" alt="" />
                    </span>
                  </div>
                  <div className="col-12 text-white text-center">
                    <div className="fs-24 fw-500 text-uppercase">Sign In</div>
                    <div className="fs-14">
                      Enter your Registered Mobile number
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    <div className="rounded floatingInner position-relative">
                      <input
                        type="text"
                        name="mobileNumber"
                        className="form-control rounded-pill bg-transparent floatingInput"
                        placeholder=" "
                        onChange={handleChange}
                        value={values.mobileNumber}
                        maxLength={10}
                        inputMode="numeric"
                      />
                      {errorMessage.mobileNumber && (
                        <span className="text-danger">
                          {errorMessage.mobileNumber}
                        </span>
                      )}

                      <label className="floatingLabel" htmlFor="entrPromo">
                        Mobile number
                      </label>
                    </div>
                  </div>
                  <div className="col-12 my-4 d-grid">
                    <button
                      type="button"
                      className="btn btn-light rounded-pill text-primary py-2 text-uppercase"
                      onClick={() =>
                        props.checkMobileAction({ mobile: values.mobileNumber })
                      }
                      disabled={values.mobileNumber === ""}
                    >
                      NEXT
                    </button>
                  </div>
                </div>
              </div>
            ) : onStep === 2 ? (
              <div className="modal-body loginMod rounded">
                <div className="row">
                  <div
                    className="col-12 text-end"
                    onClick={() => {
                      setOnStep(1);
                      setValues({
                        email: "",
                        name: "",
                        mobileNumber: "",
                      });
                    }}
                  >
                    <span className="cursor-pointer" data-bs-dismiss="modal">
                      <img src="/images/cross_mod.png" alt="" />
                    </span>
                  </div>
                  <div className="col-12 text-white text-center">
                    <div className="fs-24 fw-500 text-uppercase">Sign In</div>
                  </div>
                  <div className="col-12 mt-4">
                    <div className="rounded floatingInner position-relative">
                      <input
                        type="text"
                        name="name"
                        className="form-control rounded-pill bg-transparent floatingInput"
                        placeholder=" "
                        onChange={handleChange}
                        value={values.name}
                      />
                      {errorMessage.name && (
                        <span className="text-danger">{errorMessage.name}</span>
                      )}
                      <label className="floatingLabel" htmlFor="entrPromo">
                        Name
                      </label>
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    <div className="rounded floatingInner position-relative">
                      <input
                        name="mobileNumber"
                        type="number"
                        className="form-control rounded-pill bg-transparent floatingInput"
                        disabled={true}
                        placeholder=" "
                        onChange={handleChange}
                        value={values.mobileNumber}
                      />
                      <label className="floatingLabel" htmlFor="entrPromo">
                        Mobile number
                      </label>
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    <div className="rounded floatingInner position-relative">
                      <input
                        type="email"
                        className="form-control rounded-pill bg-transparent floatingInput"
                        placeholder=" "
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                      />
                      {errorMessage.email && (
                        <span className="text-danger">
                          {errorMessage.email}
                        </span>
                      )}
                      <label className="floatingLabel" htmlFor="entrPromo">
                        Email ID
                      </label>
                    </div>
                  </div>
                  <div className="col-12 my-4 d-grid">
                    <button
                      type="button"
                      className="btn btn-light rounded-pill text-primary py-2"
                      disabled={values.name === "" || values.email === ""}
                      onClick={handleSubmit}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            ) : onStep === 3 ? (
              <div className="modal-body loginMod rounded">
                <div className="row">
                  <div
                    className="col-12 text-end"
                    onClick={() => {
                      setOnStep(1);
                      setValues({
                        email: "",
                        name: "",
                        mobileNumber: "",
                      });
                    }}
                  >
                    <span className="cursor-pointer" data-bs-dismiss="modal">
                      <img src="/images/cross_mod.png" alt="" />
                    </span>
                  </div>
                  <div className="col-12 text-white text-center">
                    <div className="fs-24 fw-500 text-uppercase">Sign In</div>
                    <div className="fs-20 mt-3">{values.mobileNumber}</div>
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
                      onClick={() => handleSubmit2()}
                    >
                      SUBMIT
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  checkmobData: state.loginInfo.loginStore,
  userData: state.loginInfo.userInfoStore,
});

const mapDispatchToProps = (dispatch) => ({
  checkMobileAction: (payload) =>
    dispatch(loginActionCreator.checkMobileAction(payload)),
  
  loginAction: (payload) => dispatch(loginActionCreator.loginAction(payload)),
  registerAction: (payload) => dispatch(loginActionCreator.registerAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
