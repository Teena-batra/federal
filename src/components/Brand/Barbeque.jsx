import React from 'react'

function Barbeque() {
  return (
    <>
                        <div className="border-bottom border-primary-2 pb-3 position-relative">
                  <div className="row">
                    <div className="col-lg-3 col-4 ps-2 ps-md-3 pe-0">
                      <div className="border border-primary-2 text-center h-100 show_redm">
                        <img src="images/logo_13.png" alt="" />
                        <div className="text-success fs-12 text-uppercase py-2 redeem_dv">
                          Redeemable Offline{" "}
                          <i className="fa-solid fa-circle-check fs-12" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-9 col-8 pb-3 pb-md-0">
                      <div className="fs-18 fw-500 mt-3 mt-md-0">
                        Barbeque Nation Gift Vouchers
                      </div>
                      <div className="fs-14 fw-300 mt-1 d-none d-md-block">
                        Barbeque Nation is a popular chain of restaurants that
                        offer a unique dining experience. They specialize in
                        grilled dishes and sizzlers, with an emphasis on barbecue
                        chicken. The restaurant is known for its unlimited buffet,
                        where customers can choose from a wide variety of dishes
                        and enjoy as much food as they like.
                      </div>
                      <div
                        className="tc_dv cursor-pointer rounded"
                        data-bs-toggle="modal"
                        data-bs-target="#termCon"
                      >
                        T&amp;C
                      </div>
                    </div>
                  </div>
                </div>
    </>
  )
}

export default Barbeque
