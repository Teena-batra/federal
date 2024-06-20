import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Banner from "../../components/Banner";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import CartSummary from "../../components/Brand/CartSummary";
import Discount from "../../components/Brand/Discount";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as cartActionCreator from "../../Redux/Actions/ActionCreator/CartAction";
import * as brandActionCreator from "../../Redux/Actions/ActionCreator/BrandAction";
import { Link } from "react-router-dom";

function Brand(props) {
  const { slug } = useParams();

  const { brandListData, cartData, userData } = props;

  const brandData = brandListData.brand || {};

  console.log("cartData==========", cartData);

  //=================================================
  const productData =
    (brandListData?.products?.length && brandListData?.products) || [];

  productData.forEach((el, index) => {
    const findCart_id = cartData?.find((item) => item?.product_id === el?.id);
    console.log("findCart_id", findCart_id);
    if (findCart_id?.product_id === el.id){
      productData[index].quantity = findCart_id?.cart_item_qty || 0;
      productData[index].cart_id = findCart_id?.cart_item_id;
    }
    else productData[index].quantity = 0;
  });

  //console.log("productData", productData);

  //console.log("slug", slug);

  useEffect(() => {
    props.brandListAction({ slug });
  }, [slug]);

  console.log("brandListData", props.brandListData);

  return (
    <>
      <div className="main_outer summery_fixed_btm position-relative">
        <Sidebar />

        {/* banner section */}
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={brandData?.image_url}
                className="d-none d-md-block w-100"
                alt="..."
              />
              <img
                src="/imagess/banner-m.png"
                className="d-md-none w-100"
                alt="..."
              />
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

        <Navbar />

        {/* navigation */}

        {/* brand page */}
        <section className="brand_page my-2 my-md-4">
          <div className="container-lg">
            <div className="row">
              <div className="col-md-8 p-3">
                <div className="border border-primary-2 p-3 rounded brand_page_left">
                  <div className="border-bottom border-primary-2 pb-3 position-relative">
                    <div className="row">
                      <div className="col-lg-3 col-4 ps-2 ps-md-3 pe-0">
                        <div className="border border-primary-2 text-center h-100 show_redm">
                          <img src={brandData.brand_icon_url} alt="" />
                          {brandData.redemption_type === "ON" }
                          <div className="text-success fs-12 text-uppercase py-2 redeem_dv">
                            REDEEMABLE {brandData.redemption_type}LINE{" "}
                            <i className="fa-solid fa-circle-check fs-12" />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-9 col-8 pb-3 pb-md-0">
                        <div className="fs-18 fw-500 mt-3 mt-md-0">
                          {brandData.name}
                        </div>
                        <div
                          className="fs-14 fw-300 mt-1 d-none d-md-block"
                          dangerouslySetInnerHTML={{
                            __html: brandData.description,
                          }}
                        ></div>
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

                  {/* Discount */}
                  <div className="mt-3 border-bottom border-primary-2 pb-4 mb-4">
                    <div className="row row-cols-xl-3 row-cols-lg-2 row-cols-2 g-3">
                      {productData?.map((item, index) => {
                        //console.log(item);
                        const {
                          price,
                          default_offer_type,
                          default_promocode_value,
                        } = item;
                        //console.log(default_offer_type)
                        return (
                          <div className="col" key={index}>
                            <div className="border border-primary-2 deomination_outer position-relative h-100">
                              <div className="bg-light-2 text-center fs-24 fw-600 py-2 text-primary border-bottom-dashed-primary">
                                {price}
                              </div>
                              <div className="p-2 p-md-3">
                                <div className="d-flex align-items-center justify-content-between fs-14 fw-500">
                                  <div>SELLING PRICE</div>
                                  <div>
                                    {price -
                                      (price * default_promocode_value) / 100 ||
                                      0}
                                  </div>
                                </div>
                                {default_offer_type === "DIS" && (
                                  <>
                                    <div className="d-flex align-items-center text-success justify-content-between fs-14 fw-500 mt-2 mt-md-3">
                                      <div>DISCOUNT</div>
                                      <div>{default_promocode_value}% OFF</div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between fs-14 fw-500 mt-2 mt-md-3">
                                      <div>SAVING</div>
                                      <div>
                                        {parseFloat(
                                          (price * default_promocode_value) /
                                            100
                                        )}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="mt-3 d-grid qty_outer">
                                {item?.quantity ? (
                                  <div className="qtySelector rounded-pill">
                                  <div className="decreaseQty" onClick={()=> {
                                    item.quantity > 1 ? 
                                    props.cartItemUpdateAction({ cart_item_id: item.cart_id, type: 0, quantity: 1 }):
                                    props.cartItemRemoveAction({cartItemId: item.cart_id})


                                }}/>
                                  <input
                                    type="text"
                                    className="qtyValue"
                                    value={item.quantity}
                                  />
                                  <div className="increaseQty" onClick={()=> props.cartItemUpdateAction({ cart_item_id: item.cart_id, type: 1, quantity: 1 })} />
                                </div>
                                ):(
                                <button
                                  type="button"
                                  className="btn btn-outline-primary rounded-pill addQtyBrand"
                                  onClick={() => {
                                    props.addToCartAction({
                                      ...item,
                                      cart_item_qty: 0,
                                      product_name: item.name,
                                      promo: item.default_promocode,
                                      gift_status: "N",
                                      name: userData.name,
                                      mobile: userData.phone,
                                      email: userData.email,
                                      mode: 0,
                                      quantity: 1,
                                      template_id: null,
                                      gift_imgurl: "",
                                      gift_text: "",
                                      sendername: "",
                                    })
                                  }}
                                >
                                  ADD
                                </button>
                                )}

                                
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="importantIns">
                    <ul className="list-inline m-0">
                      <li className="list-inline-item">
                        <figure
                          className="m-0 text-center cursor-pointer"
                          data-bs-toggle="modal"
                          data-bs-target="#howtouse"
                        >
                          <img src="/images/imp_1.png" alt="" />
                          <figcaption className="fs-14 fw-500 text-primary">
                            How To Use
                          </figcaption>
                        </figure>
                      </li>
                      <li className="list-inline-item">
                        <figure
                          className="m-0 text-center cursor-pointer"
                          data-bs-toggle="modal"
                          data-bs-target="#impins"
                        >
                          <img
                            src="/images/imp_2.png"
                            alt=""
                            onClick={() => brandData.important_instruction}
                          />
                          <figcaption className="fs-14 fw-500 text-primary">
                            Important Instructions
                          </figcaption>
                        </figure>
                      </li>
                      <li className="list-inline-item">
                        <figure
                          className="m-0 text-center cursor-pointer"
                          data-bs-toggle="modal"
                          data-bs-target="#storeLoc"
                        >
                          <img src="/images/imp_3.png" alt="" />
                          <figcaption className="fs-14 fw-500 text-primary">
                            Store Locator
                          </figcaption>
                        </figure>
                      </li>
                      <li className="list-inline-item">
                        <figure className="m-0 text-center cursor-pointer">
                          <img src="/images/imp_4.png" alt="" />
                          <figcaption className="fs-14 fw-500 text-primary">
                            Used During Sale
                          </figcaption>
                        </figure>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* cart Summary */}
              <CartSummary />

              <div className="col-12 mt-4">
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
                          IRCTC E-GV is your online destination for e-gift
                          vouchers of brands you use and love. These vouchers
                          are available with amazing deals and discounts just
                          for IRCTC customers. From fashion and healthcare
                          brands to travel, food, and electronics, there’s a
                          voucher for all your needs. Make your shopping
                          experience smarter and more rewarding by using these
                          vouchers regularly.
                        </p>
                        <h3>
                          Get mind-blowing deals and discounts on IRCTC e-gift
                          vouchers.
                        </h3>
                        <p>
                          Most of the e-gift vouchers on IRCTC E-GV are
                          available at discounted prices. You can enjoy up to a
                          35% discount on many brands. And the best part is that
                          these discounts are available throughout the year.
                          There are no hidden costs, registration fees, or
                          membership charges to buy these vouchers. You just
                          have to pay the value of the voucher or even less than
                          that in many cases.
                        </p>
                        <h3>IRCTC e-gift vouchers for all occasions</h3>
                        <p>
                          A nice gift makes the occasions like weddings and
                          birthdays more special. But, it can be confusing to
                          choose the right gift for those special people in our
                          lives. This is where IRCTC e-gift vouchers come into
                          the picture. Send these vouchers to your family
                          members or friends instantly. By sending these
                          vouchers, you give them a chance to select the gift of
                          their choice. This is not possible with the regular
                          gifts available in the market. The e-gift vouchers are
                          ideal for all occasions like baby showers, birthdays,
                          anniversaries, weddings, retirement parties,
                          housewarming, and other special occasions. You can
                          also give these vouchers during festivals like Diwali,
                          Rakshabandhan, Christmas, Karwa Chauth, Eid, and
                          Valentine’s Day.
                        </p>
                        <h3>IRCTC e-gift vouchers for corporate gifting</h3>
                        <p>
                          Corporate gifting makes it easier to improve
                          professional relationships with clients and business
                          partners. When it comes to choosing the right gift,
                          you can trust IRCTC e-gift vouchers. They are better
                          than ordinary gifting items in the market because they
                          let the recipient choose what they want. You can use
                          these vouchers for all corporate gifting needs,
                          including:
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
                          <a href="mailto:corpbiz@gyftr.com">
                            corpbiz@gyftr.com
                          </a>
                          .
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
                          <li>
                            Online shopping sites (Amazon, Flipkart, Myntra)
                          </li>
                          <li>
                            Popular fashion brands (Bata, Biba, Puma, Levi’s
                            Relaxo)
                          </li>
                          <li>
                            Restaurants &amp; food delivery services (Domino’s,
                            Swiggy, Zomato)
                          </li>
                          <li>
                            Healthcare brands (Apollo Pharmacy, 1mg, Healthians)
                          </li>
                          <li>
                            Grocery and daily needs (Big Bazaar, Grofers, More,
                            Big Basket)
                          </li>
                          <li>
                            Cabs &amp; Travel (OLA, Uber, Yatra, MakeMyTrip)
                          </li>
                          <li>
                            Electronics and Home Appliances (Croma, Go Noise,
                            Skullcandy)
                          </li>
                          <li>
                            Skincare and beauty products (Plum, The Body Shop,
                            The Man Company)
                          </li>
                        </ul>
                        <p>
                          These are just of the brands listed on IRCTC E-GV. For
                          the entire list, go through each category.
                        </p>
                        <h4>Who can buy these e-gift vouchers?</h4>
                        <p>
                          Any individual who’s a registered user of the IRCTC
                          website can buy these vouchers instantly. You can buy
                          these vouchers through your computer system or mobile
                          application in less than five minutes. It’s as simple
                          as ordering something online from your favourite
                          online store.
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
                            On the IRCTC E-GV portal, choose one of the
                            categories present on the left side of the page.
                          </li>
                          <li>
                            From the list of brands that appear on your screen,
                            choose the one whose e-gift voucher you want to buy.
                          </li>
                          <li>
                            On the brand page that opens, select the amount of
                            the voucher by pressing the ADD button.
                          </li>
                          <li>
                            Click on the BUY NOW button that appears on the
                            screen. Pay using one of the online payment methods.
                          </li>
                        </ol>
                        <p>
                          After you make the payment, you will receive your
                          voucher on the registered mobile number or email
                          address.
                        </p>
                        <h2>How to use these e-gift vouchers online?</h2>
                        <p>
                          Follow these steps to use the e-gift vouchers on
                          online stores (Amazon, Flipkart, etc.):
                        </p>
                        <ul>
                          <li>Open the store whose voucher you want to use.</li>
                          <li>Add the products you want to buy.</li>
                          <li>
                            Open the Payments Page, find the section for using
                            the gift cards.
                          </li>
                          <li>
                            Enter your voucher code and PIN (if applicable).
                          </li>
                          <li>
                            The amount of the voucher will be deducted from your
                            final bill. You can pay the rest of the bill by any
                            of the payment methods applicable on the website.
                          </li>
                        </ul>
                        <p>
                          For the specific steps, open the specific brand page
                          on the IRCTC E-GV portal.
                        </p>
                        <h2>How to use these e-gift vouchers offline?</h2>
                        <p>
                          Follow these steps to use the e-gift vouchers on
                          offline stores (Big Bazaar, Pantaloons, etc.):
                        </p>
                        <ul>
                          <li>
                            On the brand page of the e-gift voucher, find the
                            Outlet Locator option present on the left side.
                          </li>
                          <li>
                            Type the name of your city and press enter. You will
                            get the list of the outlets in which you can use
                            your voucher.
                          </li>
                          <li>
                            Visit one of those outlets. Select the items you
                            want to buy.
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
        {/* brand page end */}

        {/* Footer */}
        <Footer />
      </div>
      {/* <div className="summery_fixed d-md-none bg-primary rounded-top p-2 d-flex align-items-center justify-content-between text-white">
        <div className="d-flex align-items-center">
          <div className="cart_dv position-relative">
            <img src="/images/cart.png" alt="" />
            <div className="cart_qty">10</div>
          </div>
          <div className="ms-3 fs-15 lh-1">Cart Summary</div>
        </div>
        <div className="fs-15 text-center">
          <span>₹2000 | </span> <span className="text-primary-2">₹175</span>
        </div>
        <Link
          href="cart.html"
          type="button"
          className="btn btn-outline-light fs-12 p-1"
        >
          View Cart
        </Link>
      </div> */}

      {/* Modal */}

      {/* <div
        className="modal fade"
        id="loginMod"
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
                  <div className="fs-24 fw-500 text-uppercase">Sign In</div>
                  <div className="fs-14">
                    Enter your Registered Mobile number
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="rounded floatingInner position-relative">
                    <input
                      type="number"
                      className="form-control rounded-pill bg-transparent floatingInput"
                      placeholder=" "
                    />
                    <label className="floatingLabel" htmlFor="entrPromo">
                      Mobile number
                    </label>
                  </div>
                </div>
                <div className="col-12 my-4 d-grid">
                  <button
                    type="button"
                    className="btn btn-light rounded-pill text-primary py-2 text-uppercase"
                    data-bs-toggle="modal"
                    data-bs-target="#oppMod"
                  >
                    REQUEST OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div
        className="modal fade"
        id="oppMod"
        tabIndex={-1}
        aria-labelledby="oppModLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-transparent border-0">
            <div className="modal-body loginMod rounded">
              <div className="row">
                <div className="col-12 text-end">
                  <span className="cursor-pointer" data-bs-dismiss="modal">
                    <img src="images/cross_mod.png" alt="" />
                  </span>
                </div>
                <div className="col-12 text-white text-center">
                  <div className="fs-24 fw-500 text-uppercase">Sign In</div>
                  <div className="fs-20 mt-3">9876543210</div>
                </div>
                <div className="col-12 mt-4">
                  <div className="otp_box">
                    <form action="" className="otp-form">
                      <input
                        className="otp-field"
                        type="number"
                        placeholder=" "
                        name="opt-field[]"
                        maxLength={1}
                      />
                      <input
                        className="otp-field"
                        type="number"
                        placeholder=" "
                        name="opt-field[]"
                        maxLength={1}
                      />
                      <input
                        className="otp-field"
                        type="number"
                        placeholder=" "
                        name="opt-field[]"
                        maxLength={1}
                      />
                      <input
                        className="otp-field"
                        type="number"
                        placeholder=" "
                        name="opt-field[]"
                        maxLength={1}
                      />
                      <input
                        className="otp-field"
                        type="number"
                        placeholder=" "
                        name="opt-field[]"
                        maxLength={1}
                      />
                      <input
                        className="otp-field"
                        type="number"
                        placeholder=" "
                        name="opt-field[]"
                        maxLength={1}
                      />
                      <input
                        className="otp-value"
                        type="hidden"
                        name="opt-value"
                      />
                    </form>
                    <div className="text-end fs-13 mt-2 pe-2">
                      <div id="timer" className="text-uppercase text-primary-2">
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
                    href="index-login.html"
                    type="button"
                    className="btn btn-light rounded-pill text-primary py-2"
                  >
                    SUBMIT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="modal fade"
        id="crateAc"
        tabIndex={-1}
        aria-labelledby="crateAcLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-transparent border-0">
            {/* <div className="modal-body loginMod rounded">
              <div className="row">
                <div className="col-12 text-end">
                  <span className="cursor-pointer" data-bs-dismiss="modal">
                    <img src="images/cross_mod.png" alt="" />
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
                      defaultValue={9876543210}
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
            </div> */}
          </div>
        </div>
      </div>

      <div
        className="modal"
        id="howtouse"
        tabIndex={-1}
        aria-labelledby="howtouseLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-header bg-primary text-white rounded-0 py-2">
              <h5 className="modal-title fw-400">HOW TO USE</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body py-0">
              <div className="owl-slider howToUse p-3">
                <div id="how_to_use" className="owl-carousel px-2">
                  <div className="item">
                    <div className="step_pop position-relative">
                      <h6 className="text-uppercase text-center position-relative">
                        <span className="bg-white px-2 d-inline-block">
                          Step 1
                        </span>
                      </h6>
                    </div>
                    <div className="border">
                      <figure className="p-1">
                        <img src="/images/crousel-1.png" />
                        <figcaption>
                          <p className="mt-2 px-2">
                            Use the outlet locator to locate the nearest outlet
                            that accepts this Gift Voucher.
                          </p>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                  <div className="item">
                    <div className="step_pop position-relative">
                      <h6 className="text-uppercase text-center position-relative">
                        <span className="bg-white px-2 d-inline-block">
                          {" "}
                          Step 2
                        </span>
                      </h6>
                    </div>
                    <div className="border">
                      <figure className="p-1">
                        <img src="/images/crousel-2.png" />
                        <figcaption>
                          <p className="mt-2 px-2">Select your product.</p>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                  <div className="item">
                    <div className="step_pop position-relative">
                      <h6 className="text-uppercase text-center position-relative">
                        <span className="bg-white px-2 d-inline-block">
                          {" "}
                          Step 3
                        </span>
                      </h6>
                    </div>
                    <div className="border">
                      <figure className="p-1">
                        <img src="/images/crousel-3.png" />
                        <figcaption>
                          <p className="mt-2 px-2">
                            Share your Gift Voucher with the cashier at the time
                            of billing &amp; pay the remaining amount by cash or
                            card if required.
                          </p>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                  <div className="item">
                    <div className="step_pop position-relative">
                      <h6 className="text-uppercase text-center position-relative">
                        <span className="bg-white px-2 d-inline-block">
                          {" "}
                          Step 4
                        </span>
                      </h6>
                    </div>
                    <div className="border">
                      <figure className="p-1">
                        <img src="/images/crousel-2.png" />
                        <figcaption>
                          <p className="mt-2 px-2">Select your product.</p>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal"
        id="impins"
        tabIndex={-1}
        aria-labelledby="impinsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-header bg-primary text-white rounded-0 py-2">
              <h5 className="modal-title fw-400">IMPORTANT INSTRUCTION</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body faq_outer">
              <div className="impInstructions">
                <ul className="list-unstyled">
                  <li>
                    Multiple Gift Vouchers <strong>CAN</strong> be used in one
                    bill.
                  </li>
                  <li>
                    Gift Vouchers <strong>CAN</strong> be used during Sale.
                  </li>
                  <li>
                    Gift Vouchers <strong>ACCEPTED</strong> at all Listed
                    Outlets.
                  </li>
                  <li className="not">
                    Gift Vouchers <strong>CANNOT</strong> be used Online.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal"
        id="storeLoc"
        tabIndex={-1}
        aria-labelledby="storeLocLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-header bg-primary text-white rounded-0 py-2">
              <h5 className="modal-title fw-400">STORE LOCATOR</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body faq_outer">
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-12 my-3 locatorForm">
                  <form action="#" method="post">
                    <div className="form-group d-flex">
                      <input
                        type="search"
                        name=""
                        placeholder="Enter City "
                        className="form-control text-muted fs-16 fw-400 rounded-0"
                      />
                      <button
                        type="submit"
                        className="btn btn-primary px-3 px-lg-4 rounded-0 fw-400"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="storeDes">
                <div className="row row-cols-lg-3 row-cols-md-2 g-3 mx-0 storeOuter">
                  <div className="col">
                    <div className="address_outer border p-2 h-100">
                      <address>
                        <h5>C.P.III -3664-03772</h5>
                        <p className="mt-3">
                          BATA SHOE STORE,16, REGD BLDG,CANNAUGHT PLACE,NEW
                          DELHI.PIN-110001.
                          <br />
                          NEW DELHI, <br />
                        </p>
                      </address>
                      <form className="custom-form w-100">
                        <div className="mb-3">
                          <input
                            name="userEmail"
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile"
                            minLength={10}
                            maxLength={10}
                          />
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary fs-14"
                          >
                            SEND THE DETAILS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col">
                    <div className="address_outer border p-2 h-100">
                      <address>
                        <h5>C.P.III -3664-03772</h5>
                        <p className="mt-3">
                          BATA SHOE STORE,16, REGD BLDG,CANNAUGHT PLACE,NEW
                          DELHI.PIN-110001.
                          <br />
                          NEW DELHI, <br />
                          DELHI
                          <br />
                          000-10000000
                        </p>
                      </address>
                      <form className="custom-form w-100">
                        <div className="mb-3">
                          <input
                            name="userEmail"
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile"
                            minLength={10}
                            maxLength={10}
                          />
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary fs-14"
                          >
                            SEND THE DETAILS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col">
                    <div className="address_outer border p-2 h-100">
                      <address>
                        <h5>C.P.III -3664-03772</h5>
                        <p className="mt-3">
                          BATA SHOE STORE,16, REGD BLDG,CANNAUGHT PLACE,NEW
                          DELHI.PIN-110001.
                          <br />
                          NEW DELHI, <br />
                          DELHI
                          <br />
                          000-10000000
                        </p>
                      </address>
                      <form className="custom-form w-100">
                        <div className="mb-3">
                          <input
                            name="userEmail"
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile"
                            minLength={10}
                            maxLength={10}
                          />
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary fs-14"
                          >
                            SEND THE DETAILS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col">
                    <div className="address_outer border p-2 h-100">
                      <address>
                        <h5>C.P.III -3664-03772</h5>
                        <p className="mt-3">
                          BATA SHOE STORE,16, REGD BLDG,CANNAUGHT PLACE,NEW
                          DELHI.PIN-110001.
                          <br />
                          NEW DELHI, <br />
                        </p>
                      </address>
                      <form className="custom-form w-100">
                        <div className="mb-3">
                          <input
                            name="userEmail"
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile"
                            minLength={10}
                            maxLength={10}
                          />
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary fs-14"
                          >
                            SEND THE DETAILS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col">
                    <div className="address_outer border p-2 h-100">
                      <address>
                        <h5>C.P.III -3664-03772</h5>
                        <p className="mt-3">
                          BATA SHOE STORE,16, REGD BLDG,CANNAUGHT PLACE,NEW
                          DELHI.PIN-110001.
                          <br />
                          NEW DELHI, <br />
                          DELHI
                          <br />
                          000-10000000
                        </p>
                      </address>
                      <form className="custom-form w-100">
                        <div className="mb-3">
                          <input
                            name="userEmail"
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile"
                            minLength={10}
                            maxLength={10}
                          />
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary fs-14"
                          >
                            SEND THE DETAILS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col">
                    <div className="address_outer border p-2 h-100">
                      <address>
                        <h5>C.P.III -3664-03772</h5>
                        <p className="mt-3">
                          BATA SHOE STORE,16, REGD BLDG,CANNAUGHT PLACE,NEW
                          DELHI.PIN-110001.
                          <br />
                          NEW DELHI, <br />
                          DELHI
                          <br />
                          000-10000000
                        </p>
                      </address>
                      <form className="custom-form w-100">
                        <div className="mb-3">
                          <input
                            name="userEmail"
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Mobile"
                            minLength={10}
                            maxLength={10}
                          />
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-primary fs-14"
                          >
                            SEND THE DETAILS
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal"
        id="termCon"
        tabIndex={-1}
        aria-labelledby="termConLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-header bg-primary text-white rounded-0 py-2">
              <h5 className="modal-title fw-400">TERMS &amp; CONDITIONS</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div
              className="modal-body faq_outer"
              dangerouslySetInnerHTML={{ __html: brandData.tnc }}
            ></div>
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
                    <img src="images/cross_mod.png" alt="" />
                  </span>
                </div>
                <div className="col-12 text-white text-center">
                  <div className="fs-24 fw-500 text-uppercase">
                    Edit Profile
                  </div>
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
                      defaultValue={9876543210}
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
  );
}

const mapStateToProps = (state) => ({
  brandListData: state.brandInfo.brandListStore,
  cartData: state.cartInfo.cartStore,
  userData: state.loginInfo.userInfoStore,
});

const mapDispatchToProps = (dispatch) => ({
  brandListAction: (payload) =>
    dispatch(brandActionCreator.brandListAction(payload)),
  addToCartAction: (payload) =>
    dispatch(cartActionCreator.addToCartAction(payload)),
  cartItemRemoveAction: (payload) =>
    dispatch(cartActionCreator.cartItemRemoveAction(payload)),
  cartItemUpdateAction: (payload) =>
    dispatch(cartActionCreator.cartItemUpdateAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Brand);
