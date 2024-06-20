import React from 'react'
import { connect } from 'react-redux'

function UpdateProfile(props) {
    const {userInfoData} = props;
  return (
    <div>
       <div
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
                <div className="fs-24 fw-500 text-uppercase">Edit Profile</div>
              </div>
              <div className="col-12 mt-4">
                <div className="rounded floatingInner position-relative mb-4">
                  <input
                    type="text"
                    className="form-control rounded-pill bg-transparent floatingInput"
                    value ={userInfoData.name}
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
                    value={userInfoData.email}
                    placeholder=" "
                  />
                  <label className="floatingLabel" htmlFor="entrPromo">
                    Email ID
                  </label>
                </div>
                <div className="rounded floatingInner position-relative mb-4">
                  <input
                    type="number"
                    className="form-control rounded-pill bg-transparent floatingInput "
                    disabled={true}
                    value={userInfoData.phone}
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
    </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
    userInfoData: state.loginInfo.userInfoStore
  })

export default connect(mapStateToProps)(UpdateProfile)
