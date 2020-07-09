import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Button, Badge } from "react-bootstrap";
import defaultImage from "../../../siteImages/defaultImage.png";
import { Carousel } from "react-responsive-carousel";
import {
  addLike,
  updateProperty,
  deleteImage,
  deleteProperty,
} from "../../../actions/propertyAction";
//import { ToastContainer } from "react-toastify";
//import { getMyPropertys } from "../../../actions/propertyAction";

const MyPropertyItem = ({
  addLike,

  deleteProperty,
  property: {
    _id,
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

  return (
    <Fragment>
      <div className="card" style={{ width: "22rem", height: "29rem" }}>
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
            <Button className="btn btn-light text-primary">${price}</Button>{" "}
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
                {like}
                {interests.length}
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
          <div className="">
            <a
              href={`/propertys/viewproperty/${_id}`}
              className="btn btn-primary"

              // onClick={() => console.log("clicked")}
            >
              View
            </a>

            <a href={`/addimages/${_id}`} className="btn btn-light text-danger">
              Add Image
            </a>
            <a
              href={`/updateproperty/${_id}`}
              className="btn btn-light text-primary mr-2"
            >
              Update
            </a>
            <Button
              className="btn-danger"
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
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

MyPropertyItem.propTypes = {
  //getProperty: PropTypes.func.isRequired,
  property: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  deleteProperty: PropTypes.func.isRequired,
};

MyPropertyItem.defaultProps = {
  //property: PropTypes.object.isRequired,
  //images: defaultImage,
};

export default connect(null, {
  addLike,
  deleteImage,
  updateProperty,
  deleteProperty,
})(MyPropertyItem);
