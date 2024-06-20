import React, { useEffect } from "react";
import * as SidebarActionCreator from "../../Redux/Actions/ActionCreator/SideBarAction";
import { connect } from "react-redux";
import Filter from "../Filter/Filter"
import { Link } from "react-router-dom";

function Discount(props) {
    const {discountData} = props;
    console.log(discountData);

    discountData?.products?.sort((a,b) => b.offer_value - a.offer_value)
   

    useEffect(()=> {
        props.discountAction();
    },[])
    
  return (
    <div>
      {/* Banner Section */}

      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            
              <img
                src={discountData?.content?.discount_banner}
                className="d-none d-md-block w-100"
                alt="..."
              />
              <img src={discountData?.content?.mobile_banner} className="d-md-none w-100" alt="..." />
            
          </div>
          
        </div>
        
      </div>


      <section className="discount_page my-2 my-md-4">
        <div className="container-lg">
          <div className="row justify-content-center">
            <div className="col-12 fs-18 mt-2 mt-md-0">
              <div className="d-flex align-items-center justify-content-between">
                <span>Top Discounts</span>
                <span
                  className="d-md-none bg-light-2 d-inline-block px-2 py-1 fs-12 rounded-pill"
                  id="filter_dv"
                >
                  {" "}
                  <i className="fa-solid fa-filter" /> FILTERS{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="row mt-2 mt-md-4">
           <Filter  />


           
          </div>
        </div>
      </section>
    </div> 
  );
}

const mapStateToProps = (state) => ({
    discountData: state.categoryInfo.discountStore
  });

  const mapDispatchToProps = (dispatch) => ({
    discountAction: () =>
      dispatch(SidebarActionCreator.discountAction()),
    
  });

export default connect(mapStateToProps, mapDispatchToProps)(Discount);
