import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Category from "./Sidebar";
//import ViewMoreButton from './ViewMoreButton';

function Navbar(props) {
  const { navListData } = props;
  const maxInitialBrands = 14;

  console.log("navListData", navListData);

  return (
    <nav className="navigation">
      <div className="container-lg">
        <div className="row">
          <div className="col-12">
            <div className="bg-white rounded-pill shadow text-center position-relative">
              <ul className="d-none d-lg-flex">
                {navListData?.map((data, index) => {
                  const brandsArray = data.brands_name.split(",");
                  const slugArray = data.brands_slug.split(",");
                  const visibleBrands = brandsArray.slice(0, maxInitialBrands);
                  const showViewMore =
                    brandsArray.length > maxInitialBrands;
                  //console.log(visibleBrands);

                  return (
                    <li key={index} className="list_outer_nv">
                      <Link to={"/category/" + data.slug}>
                        <figure className="m-0 text-center text-primary fs-14">
                          <img src={data.icon_url} alt="" />
                          <figcaption key={index}>{data.name}</figcaption>
                        </figure>
                      </Link>
                      <div className="drop_list text-start">
                        <ul className="list-inline m-0">
                          {visibleBrands.map((brand, index) => {
                            return (
                              <li key={index} className="list-inline-item">
                                <Link to={"/brand/" + slugArray[index]}>
                                  {brand}
                                </Link>
                              </li>
                            );
                          })}

                          {showViewMore && (
                            <li className="list-inline-item">
                              <Link
                                to={"/category/" + data.slug}
                                className="text-primary-2"
                                
                              >
                                View All
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </li>
                  );
                })}

                {/* <li className="list-inline-item">
                <a href="#" className="text-primary-2">
                  View All
                </a>
              </li> */}
              </ul>
              <div className="choose_cate_m d-lg-none position-relative text-start text-primary position-relative">
                Choose From the Categories
                <div className="care_m">
                  <ul className="list-inline m-0 p-0">
                    <li className="list-inline-item">
                      <a href="#">Fashion</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">Cabs &amp; Travel</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">E-Commerce</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">Entertainment</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">Dining</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">Grocery</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">Electronics</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">Gifting</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">Wellness</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  navListData: state.globalInfo.navListStore,
});

export default connect(mapStateToProps)(Navbar);
