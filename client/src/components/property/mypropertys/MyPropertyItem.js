import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Button, Modal, Badge } from "react-bootstrap";
import defaultImage from "../../../siteImages/defaultImage.png";
import { Carousel } from "react-responsive-carousel";
import {
  addLike,
  updateProperty,
  deleteImage,
  deleteProperty,
} from "../../../actions/propertyAction";
import GoogleMap from "../GoogleMap";
//import { ToastContainer } from "react-toastify";
//import { getMyPropertys } from "../../../actions/propertyAction";

const MyPropertyItem = ({
  addLike,
  deleteProperty,
  property: {
    _id,
    name,
    purpose,
    price,
    totalSquareFt,
    yearBuilt,
    address,
    company,
    website,
    description,
    homeType,
    contactPhone,
    contactEmail,
    availability,
    bathroom,
    bedroom,
    parking,
    images,
    interests,
    date,
    coordinates,
  },
}) => {
  const [
    like,
    //setLike
  ] = useState(
    <i className="fa fa-heart" style={{ fontSize: "18px", color: "blue" }} />
  );

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
            {images && images.length > 0 ? (
              images.map((image) => (
                <div key={image._id} style={{ height: "240px" }}>
                  <img src={image.locationUrl} alt="property" />
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
            <Button className="btn btn-light text-primary">
              {price}/{purpose === "rent" ? "month" : "once"}
            </Button>{" "}
          </strong>{" "}
          <small>
            <Button
              type="button"
              className="px-2 btn-light text-white float-right"
              onClick={() => addLike(_id)}
            >
              <Badge
                variant="light"
                className="mx-1"
                style={{ fontSize: "16px" }}
              >
                {" "}
                {like} {interests.length}
              </Badge>
              <span className="sr-only">Number of interests/likes</span>
            </Button>{" "}
            <Button className="btn btn-light text-primary">
              {bedroom} <i className="fa fa-bed" /> Bds <strong> | </strong>
              {bathroom} <i className="fa fa-bath" /> Ba <strong> | </strong>
              {totalSquareFt}sqm
            </Button>
          </small>
          <br />
          <small>
            <Button className="btn btn-light text-body">
              <small>
                {" "}
                <i className="fa fa-map-marker" style={{ color: "red" }} />{" "}
                {address}{" "}
              </small>
            </Button>
          </small>
          <br />
          <div className="">
            <a
              href={`/addimages/${_id}`}
              className="btn btn-light text-success"
            >
              <i className="fa fa-plus-circle" /> <small>Image</small>
            </a>
            <a
              href={`/updateproperty/${_id}`}
              className="btn btn-light text-primary"
            >
              <i className="fas fa-sync" /> <small> Update </small>
            </a>
            <a
              href={`/propertys/viewproperty/${_id}`}
              className="btn btn-light text-danger mr-2"

              // onClick={() => console.log("clicked")}
            >
              <i className="fa fa-minus-circle" /> <small> Image</small>
            </a>
            <Button
              className="btn btn-danger"
              onClick={(e) => {
                if (
                  window.confirm(
                    "Are you sure you want to delete your property?"
                  )
                ) {
                  deleteProperty(_id);
                }
              }}
            >
              <i className="fa fa-times" /> All
            </Button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <Button variant="light" className="btn " disabled>
              <h3>My iBetoch Listing </h3>
            </Button>
            {/* <p style={{ color: "#209CEE" }}>
              ETB {price}/{purpose === "rent" ? "month" : "once"} <br />
              {homeType
                .charAt(0)
                .toUpperCase()
                .concat(homeType.substr(1))} for{" "}
              {purpose.charAt(0).toUpperCase().concat(purpose.substr(1))}
            </p>

            {address.charAt(0).toUpperCase().concat(address.substr(1))} */}
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
                    <div key={image._id}>
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
              <>
                <Button className="btn btn-light text-primary btn">
                  ETB {price}/{purpose === "rent" ? "month" : "once"}
                </Button>{" "}
              </>{" "}
              <small>
                <Button
                  className="px-2 btn-light text-white float-right"
                  onClick={() => addLike(_id)}
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
                <br />
                <Button className="btn btn-light text-primary">
                  {bedroom} <i className="fa fa-bed" /> Bds | {bathroom}{" "}
                  <i className="fa fa-bath" /> Ba | {totalSquareFt}sqm
                </Button>
                <br />
                {/* <Badge
                  variant="light"
                  className="mx-1"
                  style={{ fontSize: "14px" }}
                >
                  iBetoch Estimate: {}
                </Badge>{" "}
                <br /> */}
                <Button className="btn btn-light text-primary">
                  <i className="fa fa-map-marker" style={{ color: "red" }} />{" "}
                  {address}
                </Button>
              </small>
              <br />
              {/* <Button
                className="btn btn-danger float-right"
                onClick={handleShow}
                // onClick={() => console.log("clicked")}
              >
                Report
              </Button> */}
              <br />
              <br />
            </div>
          </div>
          <br />
          <h3 className="mx-1">
            {" "}
            <i className="fa fa-key" style={{ color: "#009933" }} /> Key details{" "}
            <br />
          </h3>
          <div className="mx-1" style={{ fontSize: "20px", color: "#209CEE" }}>
            <div>
              <ul className="list-group ">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <i className="far fa-calendar" /> Posted on:{" "}
                  </span>
                  <span>
                    {" "}
                    <Moment format="MM/DD/YYYY">{date}</Moment>{" "}
                  </span>{" "}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <i className="fa fa-home" /> Home-Type:
                  </span>
                  <span className="">{homeType}</span>{" "}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <i className="fa fa-bullseye " style={{ color: "red" }} />{" "}
                    Purpose:{" "}
                  </span>

                  <span className="">{purpose}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <i className="fa fa-map-marker" style={{ color: "red" }} />{" "}
                    Address:
                  </span>
                  <small> {address} </small>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    {/* <i className="fa fa-money" style={{ color: "green" }} /> */}
                    <strong> ETB </strong> /
                    {purpose === "rent" ? "month" : "once"}:
                  </span>{" "}
                  <span className="">{price}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <i className="fa fa-bed" /> Bedrooms:
                  </span>

                  {/* <i className="fa fa-bed" /> */}
                  <span className=""> {bedroom}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {/* <i className="fa fa-bath" />  */}
                  <span>
                    <i className="fa fa-bath" /> Bathrooms:
                  </span>

                  <span className="">{bathroom}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <i className="fa fa-parking" style={{ color: "blue" }} />{" "}
                    Parking:{" "}
                  </span>
                  {/* <i className="fa fa-bath" />  */}

                  <span className="">{parking}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <i className="fa fa-cube" /> Total Square meters:{" "}
                  </span>
                  <span className="">{totalSquareFt}</span>{" "}
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <i className="far fa-calendar" /> Year Built:{" "}
                  </span>
                  <span> {yearBuilt}</span>
                </li>
              </ul>
            </div>{" "}
          </div>
          <br />
          <h3 className="mx-1">
            {" "}
            <i className="fa fa-angle-right" style={{ color: "#ffcc00" }} />
            <i className="fa fa-angle-right" style={{ color: "#ffcc00" }} />
            <i
              className="fa fa-angle-right"
              style={{ color: "#ffcc00" }}
            />{" "}
            Additional Info
          </h3>
          <div className="mx-1" style={{ fontSize: "20px", color: "#209CEE" }}>
            <ul>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <i className="far fa-calendar" /> Availabile from:{" "}
                </span>
                <span className="primary">{availability}</span>{" "}
              </li>

              <li className="list-group-item">
                <span>
                  <i className="fa fa-info" /> Description:{" "}
                </span>
                {description}
              </li>
            </ul>
          </div>
          <h3 className="mx-1">
            <i className="fa fa-user-plus" style={{ color: "#0033cc" }} />{" "}
            Contact Owner{" "}
          </h3>
          <div className="mx-1" style={{ fontSize: "20px", color: "#209CEE" }}>
            <ul>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <i className="fa fa-tag" /> Owner Type:{" "}
                </span>
                <span className="primary"> {company}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <i className="fa fa-user-circle" /> Posted By:{" "}
                </span>

                <span className="primary"> {name}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <i className="fa fa-arrow-right" /> Website:{" "}
                </span>
                {website}{" "}
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <i className="fa fa-phone" />{" "}
                  <i className="fab fa-whatsapp" style={{ color: "#4FCE5D" }} />{" "}
                  <i className="fab fa-telegram" style={{ color: "#0088cc" }} />{" "}
                  <i className="fab fa-viber" style={{ color: "#8f5db7" }} />{" "}
                </span>
                {contactPhone}{" "}
              </li>

              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <i className="fa fa-envelope" style={{ color: "red" }} />{" "}
                </span>
                {contactEmail}{" "}
              </li>
            </ul>
          </div>
          <h3 className="mx-2">
            <i className="fa fa-map-marker " style={{ color: "red" }} /> Google
            Map{" "}
          </h3>
          <div className="ml-n3" style={{ width: "100%", height: "35rem" }}>
            <GoogleMap coordinates={coordinates} price={price} />
          </div>
        </Modal.Body>

        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}

          {/* <a
            href={`/propertys/viewproperty/${_id}`}
            //variant="primary"
            className="btn btn-primary"
          >
            View
          </a> */}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

MyPropertyItem.propTypes = {
  //getProperty: PropTypes.func.isRequired,
  // authState: PropTypes.object.isRequired,
  property: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  // deleteImage: PropTypes.func.isRequired,
  deleteProperty: PropTypes.func.isRequired,
};

MyPropertyItem.defaultProps = {
  //property: PropTypes.object.isRequired,
  //images: defaultImage,
};

// const mapStateToProps = (state) => ({
//   authState: state.authReducer,
// });
export default connect(null, {
  addLike,
  deleteImage,
  updateProperty,
  deleteProperty,
})(MyPropertyItem);
