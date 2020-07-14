import React from "react";
import { Carousel } from "react-responsive-carousel";

//import { Carousel } from "react-bootstrap";
// import slide1 from "../../siteImages/betoch1.jpg";
// import slide2 from "../../siteImages/betoch2.jpg";
// import slide3 from "../../siteImages/betoch3.jpg";
import slide4 from "../../siteImages/apartment.jpg";
import slide5 from "../../siteImages/house2.jpg";
import slide6 from "../../siteImages/house8.jpg";

const CarouselSlide = () => {
  return (
    <section className="container">
      <div>
        <Carousel autoplay infiniteLoop>
          <div style={{ height: "100%", width: "100%" }}>
            <img src={slide4} alt="" />
            {/* <p className="legend">A house </p> */}
          </div>
          <div style={{ height: "100%", width: "100%" }}>
            <img src={slide5} alt="" />
          </div>
          <div style={{ height: "100%", width: "100%" }}>
            <img src={slide6} alt="" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CarouselSlide;
