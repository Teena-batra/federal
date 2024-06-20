import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../../components/navbar';
import Banner from '../../components/Banner';
import { Link } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';

function Profile(props) {
    const {userInfoData} = props;
    console.log("userData===============",userInfoData)
  return (
    <div>
        {/* Banner */}

        <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <a href="#">
              <img
                src='/images/banner-d.png'
                className="d-none d-md-block w-100"
                alt="..."
              />
              <img
                src="/images/banner-m.png"
                className="d-md-none w-100"
                alt="..."
              />
            </a>
          </div>
          <div className="carousel-item">
            <a href="#">
              <img
                src="/images/banner-d.png"
                className="d-none d-md-block w-100"
                alt="..."
              />
              <img
                src="/images/banner-m.png"
                className="d-md-none w-100"
                alt="..."
              />
            </a>
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



        <Navbar />
        <section className='profile_page py-5 bg-light'>
            <div className='container lg'>
                <div className='row p-3 bg-white'>
                    <div className='col-12 border-bottom'>
                        <div className='fs-24 fw-600 text-dark mb-1'>PROFILE</div>

                    </div>
                    <div className='col-12 nameProfileOuter'>
                        <ul className='list-inline mt-3'>
                            <li className='list-inline-item col-3 text-nowrap'>
                                Name
                            </li>
                            <li className='list-inline-item'>{userInfoData.name}</li>
                        </ul>
                        <ul className='list-inline mt-3'>
                            <li className='list-inline-item col-3 text-nowrap'>
                                phone
                            </li>
                            <li className='list-inline-item'>{userInfoData.phone}</li>
                        </ul>
                        <ul className='list-inline mt-3'>
                            <li className='list-inline-item col-3 text-nowrap'>
                                email
                            </li>
                            <li className='list-inline-item'>{userInfoData.email}</li>
                        </ul>

                    </div>
                    <div className='col-md-4 col-8 mb-4 d-grid lognBtnHome' >
                        <button type="button" className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#editprofile" >EDIT</button>
                        <UpdateProfile />

                    </div>
                </div>

            </div>
        </section>
    </div>
  )
}

const mapStateToProps = (state) => ({
    userInfoData: state.loginInfo.userInfoStore
  })

export default connect(mapStateToProps)(Profile)
