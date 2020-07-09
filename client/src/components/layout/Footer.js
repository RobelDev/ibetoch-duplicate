import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <footer className="page-footer indigo">
        <div
          className="container "
          // style={{ backgroundColor: "rgb(230, 243, 255)", fontSize: "16px" }}
        >
          {/* <hr className="rgba-white-light" style={{ margin: "0 15%" }} /> */}

          <div>
            <hr
              className="clearfix d-md-none rgba-white-light"
              style={{ margin: "10% 15% 5%" }}
            />

            {/* <div className="row pb-1"> */}
            <div className="row py-4 d-flex align-items-center">
              <div className="col-md-6 col-lg-7 text-center text-md-right">
                <a
                  className="fb-ic"
                  href="https://www.facebook.com/IBetoch-110093160772304/?modal=admin_todo_tour"
                >
                  <i className="fab fa-facebook-f white-text mr-4" />
                </a>

                <a className="tw-ic" href="#!">
                  <i className="fab fa-twitter white-text mr-4"> </i>
                </a>

                <a className="gplus-ic" href="#!">
                  <i className="fab fa-google-plus-g white-text mr-4"> </i>
                </a>

                <a className="li-ic" href="#!">
                  <i className="fab fa-linkedin-in white-text mr-4"> </i>
                </a>

                <a className="ins-ic" href="https://www.instagram.com/ibetoch/">
                  <i className="fab fa-instagram white-text" />
                </a>
              </div>
            </div>
          </div>

          {/* </div> */}
          <hr />
          {/* <div className="row d-flex text-center justify-content-center mb-md-0"> */}
          <div className="row text-center d-flex justify-content-center mb-md-0">
            <div className="col-md-2  mx-n4">
              <h6 className="text-uppercase font-weight-bold">
                <a href="/affilate">Become An Affilate</a>
              </h6>
            </div>
            <p className="hide-sm hide-md"> | </p>
            <div className="col-md-2 mx-n4">
              <h6 className="text-uppercase font-weight-bold">
                <a href="/partners">Partners</a>
              </h6>
            </div>
            <p className="hide-sm hide-md"> | </p>
            <div className="col-md-2  mx-n4">
              <h6 className="text-uppercase font-weight-bold">
                <a href="/help">FAQ</a>
              </h6>
            </div>
            <p className="hide-sm hide-md"> | </p>
            <div className="col-md-2  mx-n4">
              <h6 className="text-uppercase font-weight-bold">
                <a href="/contactus">Contact Us</a>
              </h6>
            </div>
            <p className="hide-sm hide-md"> | </p>
            <div className="col-md-2  mx-n4 ">
              <h6 className="text-uppercase font-weight-bold">
                <a href="/terms">Terms & Conditions</a>
              </h6>
            </div>
            <p className="hide-sm hide-md"> | </p>
            <div className="col-md-2  mx-n4">
              <h6 className="text-uppercase font-weight-bold">
                <a href="/privacypolicy">Privacy Policy</a>
              </h6>
            </div>
          </div>

          <div className="footer-copyright text-center py-3">
            © 2020 Copyright:
            <a href="https://ibetoch.com/"> ibetoch.com</a>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
