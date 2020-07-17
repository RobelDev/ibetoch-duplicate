import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Modal, Badge, Form, Col } from "react-bootstrap";
import defaultImage from "../../siteImages/defaultImage.png";
import { Carousel } from "react-responsive-carousel";
import { addLike, report } from "../../actions/propertyAction";
import Moment from "react-moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import smallLogo from "../../siteImages/xsmallLogo.png";
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
  const [like] = useState(
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
        style={{ width: "22rem", height: "27.8rem" }}
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
            <Button className="btn btn-light text-primary">ETB {price}</Button>{" "}
          </strong>{" "}
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
            <Button className="btn btn-light text-primary">
              {bedroom} <i className="fa fa-bed" /> Bds<strong> | </strong>
              {bathroom} <i className="fa fa-bath" /> Ba <strong> | </strong>
              {totalSquareFt}sqm
            </Button>
          </small>
          <br />
          {/* <Badge variant="light" className="mx-1" style={{ fontSize: "13px" }}>
            iBetoch Est: {}
          </Badge>
          <br /> */}
          <small>
            <Button className="btn btn-light text-primary">
              <small>
                {" "}
                <i className="fa fa-map-marker" style={{ color: "red" }} />{" "}
                {address}{" "}
              </small>
            </Button>
          </small>
          {/* <br /> */}
          {/* <div className="mb-2 my-n0 btn-block text-center">
            {/* <Button
              // href={`/propertys/viewproperty/${_id}`}
              className="btn btn-primary"
              onClick={handleShow}
            >
              View
            </Button> */}
          {/* <Button
              className="btn btn-danger float-right btn-sm"
              onClick={reportHandleShow}
              // onClick={() => console.log("clicked")}
            >
              View
            </Button> */}
          {/* </div>  */}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Button variant="light" className="btn " disabled>
              <h3>iBetoch Listing </h3>
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
                <Button className="btn btn-light text-primary btn-lg">
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
          <h3 className="mx-1">
            {" "}
            <i className="fa fa-key" style={{ color: "#009933" }} /> Key details{" "}
            <br />
          </h3>
          <div className="mx-1" style={{ fontSize: "20px", color: "#209CEE" }}>
            <div>
              <ul className="list-group ">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Posted on:
                  <Moment format="DD/MM/YYYY">{date}</Moment>{" "}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Home-Type:
                  <span className="">{homeType}</span>{" "}
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
                  <span className="">ETB:{price}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Bedrooms:
                  {/* <i className="fa fa-bed" /> */}
                  <span className=""> {bedroom}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {/* <i className="fa fa-bath" />  */}
                  Bathrooms:
                  <span className="">{bathroom}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {/* <i className="fa fa-bath" />  */}
                  Parking:
                  <span className="">{parking}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Total Square meters:
                  <span className="">{totalSquareFt}</span>{" "}
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Year Built: <span> {yearBuilt}</span>
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
            Additional Description
          </h3>
          <div className="mx-1" style={{ fontSize: "20px", color: "#209CEE" }}>
            <ul>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {" "}
                Availability: {availability}{" "}
              </li>
              <li className="list-group-item"> Description: {description} </li>
            </ul>
          </div>
          <h3 className="mx-1">
            <i className="fa fa-user-plus" style={{ color: "#0033cc" }} />{" "}
            Contact Owner{" "}
          </h3>
          <div className="mx-1" style={{ fontSize: "20px", color: "#209CEE" }}>
            <ul>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Owner Type:
                <span className="primary"> {company}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Posted By:
                <span className="primary"> {user.name}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {" "}
                Website: {website}{" "}
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {" "}
                ContactInfo: {contactInfo}{" "}
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
