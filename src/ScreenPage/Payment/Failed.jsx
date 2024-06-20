import React from 'react'

function Failed() {
  return (
    <div>
<section className="thankyou_page my-2 my-md-4">
  <div className="container-lg">
    <div className="row justify-content-center">
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
        <button type="button" className="btn btn-primary px-5">
          TRY AGAIN
        </button>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Failed
