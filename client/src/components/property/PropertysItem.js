import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Modal, Badge, Form, Col, Row } from "react-bootstrap";
import defaultImage from "../../siteImages/defaultImage.png";
import { Carousel } from "react-responsive-carousel";
import { addLike, report } from "../../actions/propertyAction";
import Moment from "react-moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import smallLogo from "../../siteImages/xsmallLogo.png";
import GoogleMap from "./GoogleMap";

// import ViewProperty from "./ViewProperty";

const PropertyItem = ({
  addLike,
  // findOnMap,
  report,
  authState,
  // propertyState: { loading, coordinates },
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
    coordinates,
  },
}) => {
  const [like, setLike] = useState(
    <i className="fa fa-heart" style={{ fontSize: "18px", color: "blue" }} />
  );

  const [formData, setFormData] = useState({
    reason: "",
    // coor: "",
    // prop_address: "",
    buttonText: "Report",
  });

  const { reason, buttonText } = formData;

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitReport = async (e) => {
    e.preventDefault();
    //make sure the password match
    if (!authState.isAuth) {
      return toast.error("Please sign in first to report a property!");
    }
    if (reason === "") {
      return toast.error("Please pick a reason before submitting!");
    } else {
      setFormData({ ...formData, buttonText: "Reporting" });

      report({ reason, _id });

      setFormData({
        ...formData,
        buttonText: "Reported",
      });
    }
  };

  const [show, setShow] = useState(false);
  const [reportShow, setReportShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reportHandleClose = () => setReportShow(false);
  const reportHandleShow = () => setReportShow(true);

  return (
    <Fragment>
      <div
        className="card"
        style={{ width: "22rem", height: "29.7rem" }}
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
          <br />
          <Badge variant="light" className="mx-1" style={{ fontSize: "13px" }}>
            iBetoch Est: {}
          </Badge>
          <small>
            <Button
              className="px-2 btn-light text-white float-right"
              onClick={(e) => addLike(_id)}
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
              {bedroom} <i className="fa fa-bed" /> Bds<strong> | </strong>
              {bathroom} <i className="fa fa-bath" /> Ba <strong> | </strong>
              {totalSquareFt}sqft
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
            <Button
              // href={`/propertys/viewproperty/${_id}`}
              className="btn btn-primary"
              onClick={handleShow}
            >
              View
            </Button>

            {/* <Button
              className="btn btn-danger float-right btn-sm"
              onClick={reportHandleShow}
              // onClick={() => console.log("clicked")}
            >
              View
            </Button> */}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Button variant="light" className="btn-block" disabled>
              <h2>iBetoch Listing </h2>
            </Button>
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
              <strong>
                <Button className="btn btn-light text-primary">${price}</Button>{" "}
              </strong>{" "}
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
                <Button className="btn btn-light text-secondary">
                  {bedroom}Bedrooms|{bathroom}Bathrooms|{totalSquareFt}sqft
                </Button>
                <br />
                <Badge
                  variant="secondary"
                  className="mx-1"
                  style={{ fontSize: "14px" }}
                >
                  iBetoch Estimate: {}
                </Badge>
              </small>
              <br />
              <Button
                className="btn btn-danger float-right"
                onClick={reportHandleShow}
                // onClick={() => console.log("clicked")}
              >
                Report
              </Button>
              <br />
              <br />
            </div>
          </div>
          <br />
          <h3>
            {" "}
            <i className="fa fa-key"></i> Key details <br />
          </h3>
          <div className="" style={{ fontSize: "18px" }}>
            <div>
              <ul className="list-group ">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Posted on:
                  <Moment format="DD/MM/YYYY">{date}</Moment>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Purpose:
                  <span className="">{purpose}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Address:
                  {/* <i className="fa fa-map-marker" /> */}
                  <span className="">{address}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Price:
                  <span className="">{price}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Home-Type:
                  <span className="">{homeType}</span>{" "}
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {/* <i className="fa fa-bath" />  */}
                  Bathroom:
                  <span className="">{bathroom}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Bedroom:
                  {/* <i className="fa fa-bed" /> */}
                  <span className=""> {bedroom}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Total Square Ft:
                  <span className="">{totalSquareFt}</span>{" "}
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Year Built: <span className="">{yearBuilt}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  By:
                  <span className="primary"> {company}</span>
                </li>
              </ul>
            </div>{" "}
            <i className="fa fa-angle-right" />
            <i className="fa fa-angle-right" />
            <i className="fa fa-angle-right" />
            <div>
              <h3>Additional Informtion</h3>
              <ul>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {" "}
                  Website: {website}{" "}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {" "}
                  ContactInfo: {contactInfo}{" "}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {" "}
                  Availability: {availability}{" "}
                </li>
                <li className="list-group-item">
                  {" "}
                  Description: {description}{" "}
                </li>
              </ul>
            </div>
          </div>
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

      <Modal show={reportShow} onHide={reportHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report a property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div
            className="card"
            // style={{ width: "22rem", height: "28rem" }}
            onClick={reportHandleShow}
          >
            {/* <div className="card-body"> */}
            {/* <div className="card-body my-n5 mb-1 p-2 float-left"> */}
            <br />
            <div className="pl-4">
              <h6>
                Report a property by selecting one from the provided list of
                issues/options. If your issue is not listed, please select
                other. Thank you for making iBetoch safe environment for users.
              </h6>{" "}
              {!authState.isAuth && (
                <h5>
                  Please
                  <Link to="/auth"> Sign in or Join</Link> First to report an
                  issue.{" "}
                </h5>
              )}
            </div>
            <Form>
              <hr />
              <Form.Row>
                <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                  {/* <Form.Label column sm={2}>
                    Report
                  </Form.Label> */}

                  <Form.Control
                    as="select"
                    // defaultValue="homeType"
                    name="reason"
                    value={reason}
                    onChange={onChange}
                    required
                  >
                    <option aria-disabled>choose</option>
                    <option>I own this property</option>
                    <option>It's spam</option>
                    <option>It's is inappropriate</option>
                    <option>Fake property listing</option>
                    {/* <option>Violates the community standard</option> */}
                    <option>other</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>

            <br />
            <br />
            <br />
          </div>
          {/* </div> */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={reportHandleClose}>
            Close
          </Button>

          <Button variant="danger" onClick={onSubmitReport}>
            {buttonText}
          </Button>
          {/* <a
              href={`/property/report`}
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

PropertyItem.propTypes = {
  property: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  report: PropTypes.func.isRequired,
};

PropertyItem.defaultProps = {
  // images: defaultImage,
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
  authState: state.authReducer,
});

export default connect(mapStateToProps, { addLike, report })(PropertyItem);
