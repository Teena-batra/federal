import React, {Fragment} from 'react'
import {Link} from "react-router-dom";

function Banner() {
  return (
    <Fragment>
    {/* banner section */}
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Link to="#">
              <img
                src="/imagess/banner-d.png"
                className="d-none d-md-block w-100"
                alt="..."
              />
              <img
                src="/imagess/banner-m.png"
                className="d-md-none w-100"
                alt="..."
              />
            </Link>
          </div>
          <div className="carousel-item">
            <Link to="#">
              <img
                src="/imagess/banner-d.png"
                className="d-none d-md-block w-100"
                alt="..."
              />
              <img
                src="/imagess/banner-m.png"
                className="d-md-none w-100"
                alt="..."
              />
            </Link>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* banner section end */}
    </Fragment>
  )
}

export default Banner
