import React, { useEffect } from 'react'
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import Sidebar from '../../components/Sidebar'
//import * as brandActionCreator from "../../Redux/Actions/ActionCreator/BrandAction";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as homeActionCreator from "../../Redux/Actions/ActionCreator/HomeAction"

function HomeBodyContent(props) {

  const {homeContentData} = props;

   console.log("homeContentData=============>", homeContentData?.top_discount);
  // console.log("categoryData==============>", categoryData);

  //const brandData = brandListData?.brand || {};

  useEffect(() => {
    props.homeContentAction()
  },[])


  return (<>
    <Sidebar />
    <div className="main_outer position-relative">
     
      {/* banner section */}
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
      {/* banner section end */}
      {/* navigation */}
<Navbar />
      {/* navigation end */}
      {/* home listing section */}
      <section className="best_seller my-3 my-md-5">
        <div className="container-lg">
          <div className="row">
            <div className="col-12">
              <div className="main_heading text-center">
                <h4>Best Seller</h4>
                <p>Browse the huge variety of our best seller</p>
              </div>
            </div>
            <div className="col-12 mt-4">
              <div className="row row-cols-xl-5 row-cols-md-4 row-cols-2 g-3">
                {homeContentData?.top_discount?.map((item, index) => {
                
                  return (<>
                  
                <div className="col" key={index}>
                  <Link
                    to={"/brand/"+item.slug}
                    className="inner_list rounded p-2 text-center d-block"
                  >
                    <div className="position-relative">
                      <img
                        src={item.image_url}
                        className="w-100 rounded"
                        alt=""
                      />
                      {item.offer_type === "DIS" && (
                      <div className="discount_strip">{item.offer_value}% Discount</div>
                      )}
                    </div>
                    
                    <div className="mt-1">
                      <img src={item.brand_icon_url} alt="" />
                    </div>
                  </Link>
                </div>
                </>)
                })}
               
              </div>
            </div>
            <div className="col-12 mt-4 text-center">
              <Link
              to="/discount"
                type="button"
                className="btn btn-outline-primary rounded-pill px-5 text-uppercase"
              >
                Explore All
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* home listing section end */}
      {/* Exclusive Offers */}
      <section className="bg-light py-3 py-md-5">
        <div className="container-lg">
          <div className="row">
            <div className="col-12">
              <div className="main_heading text-center">
                <h4>Exclusive Offers</h4>
                <p>Browse the huge variety of our best seller</p>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="row m-0 row-cols-xl-5 row-cols-md-4 row-cols-sm-3 row-cols-2 g-3 g-md-5">
                <div className="col">
                  <a href="brand.html" className="exc_inner text-center d-block">
                    <div className="exc_image p-2 overflow-hidden">
                      <img
                        src="images/exc_bg_1.png"
                        className="w-100 rounded-pill"
                        alt=""
                      />
                    </div>
                    <div className="">
                      <img src="images/logo_9.png" alt="" />
                    </div>
                    <div className="fs-15 text-primary">
                      Buy a Voucher &amp; Get Giva ₹ 300 Promo Code Free
                    </div>
                  </a>
                </div>
                <div className="col">
                  <a href="brand.html" className="exc_inner text-center d-block">
                    <div className="exc_image p-2 overflow-hidden">
                      <img
                        src="/images/exc_bg_2.png"
                        className="w-100 rounded-pill"
                        alt=""
                      />
                    </div>
                    <div className="">
                      <img src="/images/logo_10.png" alt="" />
                    </div>
                    <div className="fs-15 text-primary">
                      Buy a Voucher &amp; Get Giva ₹ 300 Promo Code Free
                    </div>
                  </a>
                </div>
                <div className="col">
                  <a href="brand.html" className="exc_inner text-center d-block">
                    <div className="exc_image p-2 overflow-hidden">
                      <img
                        src="/images/exc_bg_3.png"
                        className="w-100 rounded-pill"
                        alt=""
                      />
                    </div>
                    <div className="">
                      <img src="/images/logo_11.png" alt="" />
                    </div>
                    <div className="fs-15 text-primary">
                      Buy a Voucher &amp; Get Giva ₹ 300 Promo Code Free
                    </div>
                  </a>
                </div>
                <div className="col">
                  <a href="brand.html" className="exc_inner text-center d-block">
                    <div className="exc_image p-2 overflow-hidden">
                      <img
                        src="images/exc_bg_4.png"
                        className="w-100 rounded-pill"
                        alt=""
                      />
                    </div>
                    <div className="">
                      <img src="images/logo_12.png" alt="" />
                    </div>
                    <div className="fs-15 text-primary">
                      Buy a Voucher &amp; Get Giva ₹ 300 Promo Code Free
                    </div>
                  </a>
                </div>
                <div className="col">
                  <a href="brand.html" className="exc_inner text-center d-block">
                    <div className="exc_image p-2 overflow-hidden">
                      <img
                        src="images/exc_bg_2.png"
                        className="w-100 rounded-pill"
                        alt=""
                      />
                    </div>
                    <div className="">
                      <img src="images/logo_4.png" alt="" />
                    </div>
                    <div className="fs-15 text-primary">
                      Buy a Voucher &amp; Get Giva ₹ 300 Promo Code Free
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 mt-5">
              <div className="accordion btf_accordian" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      More About Barbeque Nation Gift Vouchers
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body btfText">
                      <p>
                        IRCTC E-GV is your online destination for e-gift vouchers
                        of brands you use and love. These vouchers are available
                        with amazing deals and discounts just for IRCTC customers.
                        From fashion and healthcare brands to travel, food, and
                        electronics, there’s a voucher for all your needs. Make
                        your shopping experience smarter and more rewarding by
                        using these vouchers regularly.
                      </p>
                      <h3>
                        Get mind-blowing deals and discounts on IRCTC e-gift
                        vouchers.
                      </h3>
                      <p>
                        Most of the e-gift vouchers on IRCTC E-GV are available at
                        discounted prices. You can enjoy up to a 35% discount on
                        many brands. And the best part is that these discounts are
                        available throughout the year. There are no hidden costs,
                        registration fees, or membership charges to buy these
                        vouchers. You just have to pay the value of the voucher or
                        even less than that in many cases.
                      </p>
                      <h3>IRCTC e-gift vouchers for all occasions</h3>
                      <p>
                        A nice gift makes the occasions like weddings and
                        birthdays more special. But, it can be confusing to choose
                        the right gift for those special people in our lives. This
                        is where IRCTC e-gift vouchers come into the picture. Send
                        these vouchers to your family members or friends
                        instantly. By sending these vouchers, you give them a
                        chance to select the gift of their choice. This is not
                        possible with the regular gifts available in the market.
                        The e-gift vouchers are ideal for all occasions like baby
                        showers, birthdays, anniversaries, weddings, retirement
                        parties, housewarming, and other special occasions. You
                        can also give these vouchers during festivals like Diwali,
                        Rakshabandhan, Christmas, Karwa Chauth, Eid, and
                        Valentine’s Day.
                      </p>
                      <h3>IRCTC e-gift vouchers for corporate gifting</h3>
                      <p>
                        Corporate gifting makes it easier to improve professional
                        relationships with clients and business partners. When it
                        comes to choosing the right gift, you can trust IRCTC
                        e-gift vouchers. They are better than ordinary gifting
                        items in the market because they let the recipient choose
                        what they want. You can use these vouchers for all
                        corporate gifting needs, including:
                      </p>
                      <ul>
                        <li>Employee Rewards and Recognition</li>
                        <li>Client acquisition</li>
                        <li>Bulk Payouts</li>
                        <li>Festival Gifting</li>
                        <li>Sales Incentives</li>
                        <li>Client Management</li>
                        <li>Consumer Promotions</li>
                        <li>Channel Gifting</li>
                        <li>And all other types of corporate gifting</li>
                      </ul>
                      <p>
                        Reach out to us for corporate gifting solutions:{" "}
                        <a href="mailto:corpbiz@gyftr.com">corpbiz@gyftr.com</a>.
                      </p>
                      <h3>
                        What type of e-gift vouchers are available for IRCTC
                        customers?
                      </h3>
                      <p>
                        There are more than 160 brands whose vouchers you can
                        purchase from this platform. These brands include:
                      </p>
                      <ul>
                        <li>Online shopping sites (Amazon, Flipkart, Myntra)</li>
                        <li>
                          Popular fashion brands (Bata, Biba, Puma, Levi’s Relaxo)
                        </li>
                        <li>
                          Restaurants &amp; food delivery services (Domino’s,
                          Swiggy, Zomato)
                        </li>
                        <li>
                          Healthcare brands (Apollo Pharmacy, 1mg, Healthians)
                        </li>
                        <li>
                          Grocery and daily needs (Big Bazaar, Grofers, More, Big
                          Basket)
                        </li>
                        <li>Cabs &amp; Travel (OLA, Uber, Yatra, MakeMyTrip)</li>
                        <li>
                          Electronics and Home Appliances (Croma, Go Noise,
                          Skullcandy)
                        </li>
                        <li>
                          Skincare and beauty products (Plum, The Body Shop, The
                          Man Company)
                        </li>
                      </ul>
                      <p>
                        These are just of the brands listed on IRCTC E-GV. For the
                        entire list, go through each category.
                      </p>
                      <h4>Who can buy these e-gift vouchers?</h4>
                      <p>
                        Any individual who’s a registered user of the IRCTC
                        website can buy these vouchers instantly. You can buy
                        these vouchers through your computer system or mobile
                        application in less than five minutes. It’s as simple as
                        ordering something online from your favourite online
                        store.
                      </p>
                      <h2>How to buy these e-gift vouchers?</h2>
                      <p>
                        Follow these steps to buy an e-gift voucher from IRCTC
                        E-GV:
                      </p>
                      <ol>
                        <li>
                          Login to your IRCTC account. Create a new account
                          instantly if not registered yet.
                        </li>
                        <li>
                          On the IRCTC E-GV portal, choose one of the categories
                          present on the left side of the page.
                        </li>
                        <li>
                          From the list of brands that appear on your screen,
                          choose the one whose e-gift voucher you want to buy.
                        </li>
                        <li>
                          On the brand page that opens, select the amount of the
                          voucher by pressing the ADD button.
                        </li>
                        <li>
                          Click on the BUY NOW button that appears on the screen.
                          Pay using one of the online payment methods.
                        </li>
                      </ol>
                      <p>
                        After you make the payment, you will receive your voucher
                        on the registered mobile number or email address.
                      </p>
                      <h2>How to use these e-gift vouchers online?</h2>
                      <p>
                        Follow these steps to use the e-gift vouchers on online
                        stores (Amazon, Flipkart, etc.):
                      </p>
                      <ul>
                        <li>Open the store whose voucher you want to use.</li>
                        <li>Add the products you want to buy.</li>
                        <li>
                          Open the Payments Page, find the section for using the
                          gift cards.
                        </li>
                        <li>Enter your voucher code and PIN (if applicable).</li>
                        <li>
                          The amount of the voucher will be deducted from your
                          final bill. You can pay the rest of the bill by any of
                          the payment methods applicable on the website.
                        </li>
                      </ul>
                      <p>
                        For the specific steps, open the specific brand page on
                        the IRCTC E-GV portal.
                      </p>
                      <h2>How to use these e-gift vouchers offline?</h2>
                      <p>
                        Follow these steps to use the e-gift vouchers on offline
                        stores (Big Bazaar, Pantaloons, etc.):
                      </p>
                      <ul>
                        <li>
                          On the brand page of the e-gift voucher, find the Outlet
                          Locator option present on the left side.
                        </li>
                        <li>
                          Type the name of your city and press enter. You will get
                          the list of the outlets in which you can use your
                          voucher.
                        </li>
                        <li>
                          Visit one of those outlets. Select the items you want to
                          buy.
                        </li>
                        <li>
                          At the billing counter, show your e-gift voucher
                          message.
                        </li>
                      </ul>
                      <p>
                        The executive will reduce the voucher amount from your
                        final bill.
                      </p>
                      <h2>Is there any capping on any brand?</h2>
                      <p>
                        Yes, there’s a maximum limit of Rs. 10,000 for Amazon
                        e-gift vouchers per month per user.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Exclusive Offersend */}
      {/* footer  */}
        < Footer />
      {/* footer end */}
    </div>
    {/* Modal */}


    <div
      className="modal fade"
      id="crateAc"
      tabIndex={-1}
      aria-labelledby="crateAcLabel"
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
                <div className="fs-24 fw-500 text-uppercase">Sign In</div>
              </div>
              <div className="col-12 mt-4">
                <div className="rounded floatingInner position-relative">
                  <input
                    type="text"
                    className="form-control rounded-pill bg-transparent floatingInput"
                    placeholder=" "
                  />
                  <label className="floatingLabel" htmlFor="entrPromo">
                    Name
                  </label>
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="rounded floatingInner position-relative">
                  <input
                    type="number"
                    className="form-control rounded-pill bg-transparent floatingInput"
                    defaultValue=""
                    disabled=""
                    placeholder=" "
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
                  />
                  <label className="floatingLabel" htmlFor="entrPromo">
                    Emal ID
                  </label>
                </div>
              </div>
              <div className="col-12 my-4 d-grid">
                <button
                  type="button"
                  className="btn btn-light rounded-pill text-primary py-2"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Modal */}
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
                    defaultValue="Roushan"
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
                    defaultValue="roushan@gmail.com"
                    placeholder=" "
                  />
                  <label className="floatingLabel" htmlFor="entrPromo">
                    Email ID
                  </label>
                </div>
                <div className="rounded floatingInner position-relative mb-4">
                  <input
                    type="number"
                    className="form-control rounded-pill bg-transparent floatingInput"
                    defaultValue=""
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
  </>
  )
}

const mapStateToProps = (state) => ({
    homeContentData: state.homeInfo.homeContentStore
});

const mapDispatchToProps = (dispatch) => ({
  homeContentAction: () => 
      dispatch(homeActionCreator.homeContentAction())
  
}); 


export default connect(mapStateToProps, mapDispatchToProps)(HomeBodyContent);