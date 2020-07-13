import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

// import Search from "../search/Search";
import Footer from "./Footer";
import CardItems from "./CardItems";

import CarouselSlide from "./CarouselSlide";

const Landing = (props) => {
  return (
    <Fragment>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h2 className="x-large">Find your next home...</h2>

            <div>
              {/* <Link to="/login" className="btn btn-primary">
                Login
              </Link> */}
              <Link to="/propertys" className="btn btn-primary btn-bg">
                Rent, Buy and Sell properties in Ethiopia{" "}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CardItems />

      <CarouselSlide />

      <Footer />
    </Fragment>
  );
};

Landing.propTypes = {};

export default Landing;
