import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Modal, Badge } from "react-bootstrap";
import defaultImage from "../../siteImages/defaultImage.png";
import { Carousel } from "react-responsive-carousel";
import { addLike } from "../../actions/propertyAction";
import Moment from "react-moment";
// import ViewProperty from "./ViewProperty";

const PropertyItem = ({
  addLike,
  property: {
    _id,
    user,
    purpose,
    price,
    totalSquareFt,
    yearBuilt,
    address,
    company,
    website,
    description,
    homeType,
    contactInfo,
    availability,
    bathroom,
    bedroom,
    parking,
    images,
    interests,
    date,
  },
}) => {
  const [
    like,
    //setLike
  ] = useState(
    <i className="fa fa-heart" style={{ fontSize: "18px", color: "blue" }} />
  );

  // const onAddLike = async () => {
  //   // if (interests.map((like) => like._id !== user._id)) {

  //   // setLike(
  //   //   <i className="fa fa-heart" style={{ fontSize: "20px", color: "blue" }} />
  //   // );
  //   addLike(_id);
  // };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <div
        className="card"
        style={{ width: "22rem", height: "28.3rem" }}
        onDoubleClick={handleShow}
      >
        <div style={{ height: "23rem" }}>
          <Carousel autoPlay infiniteLoop>
            {images.length > 0 ? (
              images.map((image) => (
                <div key={image._id} style={{ height: "240px" }}>
                  <img src={image.locationUrl} alt="" />
                </div>
              ))
            ) : (
              <img src={defaultImage} alt="Default" />
            )}
          </Carousel>
        </div>

        <div className="card-img-overlay text-white">
          {" "}
          <strong>
            {" "}
            {homeType
              .charAt(0)
              .toUpperCase()
              .concat(homeType.substr(1))} for{" "}
            {purpose.charAt(0).toUpperCase().concat(purpose.substr(1))}
          </strong>
          <br />
          <strong>
            Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
          </strong>
        </div>
        {/* <div className="card-body"> */}
        <div className="card-body my-n5  p-2 float-left">
          <strong>
            <Button className="btn btn-light text-primary">${price}</Button>{" "}
          </strong>{" "}
          <small>
            <Button
              className="px-2 btn-light text-white float-right"
              onClick={(e) => {
                addLike(_id);
                // window.location.reload();
              }}
            >
              <Badge
                variant="light"
                className="mx-1"
                style={{ fontSize: "16px" }}
              >
                {like} {interests.length > 0 && interests.length}
              </Badge>
              <span className="sr-only">Number of interests/likes</span>
            </Button>{" "}
            <Button className="btn btn-light text-secondary">
              {bedroom}Bedrooms|{bathroom}Bathrooms|{totalSquareFt}sqft
            </Button>
          </small>
          <br />
          <small>
            <Button className="btn btn-light text-body">
              <small> {address} </small>
            </Button>
          </small>
          <br />
          <div className="mb-2 my-n0 btn-block text-center">
            <a
              href={`/propertys/viewproperty/${_id}`}
              className="btn btn-primary"
              // onClick={() => console.log("clicked")}
            >
              View Property
            </a>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {homeType.charAt(0).toUpperCase().concat(homeType.substr(1))} for{" "}
            {purpose.charAt(0).toUpperCase().concat(purpose.substr(1))} at{" "}
            {address.charAt(0).toUpperCase().concat(address.substr(1))}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div
            className="card"
            // style={{ width: "22rem", height: "28rem" }}
            onDoubleClick={handleShow}
          >
            <div>
              <Carousel autoPlay infiniteLoop>
                {images.length > 0 ? (
                  images.map((image) => (
                    <div key={image._id} style={{ height: "200px" }}>
                      <img src={image.locationUrl} alt="" />
                    </div>
                  ))
                ) : (
                  <img src={defaultImage} alt="Default " />
                )}
              </Carousel>
            </div>

            <div className="card-img-overlay text-white">
              {" "}
              <strong>
                {" "}
                {homeType
                  .charAt(0)
                  .toUpperCase()
                  .concat(homeType.substr(1))}{" "}
                for {purpose.charAt(0).toUpperCase().concat(purpose.substr(1))}
              </strong>
              <br />
              <strong>
                Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
              </strong>
            </div>
            {/* <div className="card-body"> */}
            <div className="card-body my-n5 mb-1 p-2 float-left">
              <strong>
                <Button className="btn btn-light text-primary">${price}</Button>{" "}
              </strong>{" "}
              <small>
                <Button
                  className="px-2 btn-light text-white float-right"
                  onClick={() => addLike(_id)}
                >
                  {like}
                  <Badge
                    variant="light"
                    className="mx-1"
                    style={{ fontSize: "16px" }}
                  >
                    {" "}
                    {interests.length > 0 && interests.length}
                  </Badge>
                  <span className="sr-only">Number of interests/likes</span>
                </Button>{" "}
                <br />
                <Button className="btn btn-light text-secondary">
                  {bedroom}Bedrooms|{bathroom}Bathrooms|{totalSquareFt}sqft
                </Button>
              </small>
              <br />
              <br />
              <br />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <a
            href={`/propertys/viewproperty/${_id}`}
            //variant="primary"
            className="btn btn-primary"
          >
            View
          </a>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

PropertyItem.propTypes = {
  property: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
};

PropertyItem.defaultProps = {
  // images: defaultImage,
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { addLike })(PropertyItem);
