import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProperty, deleteImage } from "../../actions/propertyAction";
import { Spinner, Button, Badge } from "react-bootstrap";
import defaultImage from "../../siteImages/defaultImage.png";
import { Carousel } from "react-responsive-carousel";
import { addLike, findOnMap } from "../../actions/propertyAction";

import { withRouter } from "react-router-dom";
// import GoogleMap from "./GoogleMap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewProperty = ({
  history,
  deleteImage,
  findOnMap,
  addLike,
  match,
  getProperty,
  propertyState: { property, loading, coordinates },
  authState: { user },

  // propertyState: { property, loading },
}) => {
  const [formData, setFormData] = useState({
    prop_id: "",
    owner: false,
    propAddress: "",
    coor: "",
  });

  const { propAddress, coor } = formData;

  useEffect(() => {
    let prop_id = match.params.prop_id;
    if (prop_id) {
      setFormData({ ...formData, prop_id });
      getProperty(prop_id);
    }

    if (!loading && property && property.address !== null) {
      setFormData({ ...formData, propAddress: property.address });
      findOnMap({ address: property.address });
    }

    if (coordinates !== null) {
      setFormData({ ...formData, coor: coordinates });
    }

    // eslint-disable-next-line
  }, [
    getProperty,
    loading,
    match.params.prop_id,
    deleteImage,
    findOnMap,
    propAddress,
    coor,
  ]);

  if (loading) {
    return (
      <Spinner animation="border" variant="primary" className="text-center" />
    );
  }

  return (
    <Fragment>
      <ToastContainer />
      {property ? (
        <Fragment>
          <div className="container">
            <div>
              <Carousel autoPlay infiniteLoop>
                {property.images.length > 0 ? (
                  property.images.map((image) => (
                    <div key={image._id}>
                      <div>
                        <img src={image.locationUrl} alt="property"></img>{" "}
                      </div>
                      <div>
                        {user && property && property.user._id === user._id && (
                          <Badge
                            className="btn btn-danger btn-sm float-right "
                            onClick={() =>
                              deleteImage({
                                prop_id: property._id,
                                image_id: image._id,
                                history,
                              })
                            }
                          >
                            Remove an Image
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <img src={defaultImage} alt="Default " />
                )}
              </Carousel>
            </div>

            <div className="shadow=lg p-3 mb-5 bg-white rounded">
              <Button
                className="px-2 btn-light text-white float-right"
                onClick={() => addLike(property._id)}
              >
                <Badge
                  variant="light"
                  className="mx-1"
                  style={{ fontSize: "16px" }}
                >
                  <i
                    className="fa fa-heart"
                    style={{ fontSize: "18px", color: "blue" }}
                  />{" "}
                  {property.interests.length}
                </Badge>
                <span className="sr-only">Number of interests/likes</span>
              </Button>{" "}
              <p>
                To delete an image please click it at the bottom(border line of)
                of the red box
              </p>
              <hr />
              {/* <div style={{ fontSize: "18px" }}>
                <p></p>
                <h3> Key details </h3>

                <ul className="list-group ">
                  <li className="list-group-item">
                    Posted on:
                    <Moment format="DD/MM/YYYY">{property.date}</Moment>
                  </li>
                  <li className="list-group-item">
                    Purpose: {property.purpose}
                  </li>
                  <li className="list-group-item">
                    Address: {property.address}{" "}
                  </li>
                  <li className="list-group-item">Price: {property.price}</li>
                  <li className="list-group-item">
                    Home-Type: {property.homeType}
                  </li>
                  <li className="list-group-item">
                    Bathroom <i class="fa fa-bath" /> : {property.bathroom}{" "}
                  </li>

                  <li className="list-group-item">
                    Bedroom <i className="fa fa-bed" /> : {property.bedroom}{" "}
                  </li>

                  <li className="list-group-item">
                    Total Square Ft: {property.totalSquareFt}{" "}
                  </li>
                  <li className="list-group-item">
                    {" "}
                    Year Built: {property.yearBuilt}
                  </li>
                  <li className="list-group-item"> By: {property.company}</li>
                </ul>
                <br />
                <h3>Additional Informtion</h3>
                <ul>
                  <li className="list-group-item">
                    {" "}
                    Website: {property.website}{" "}
                  </li>
                  <li className="list-group-item">
                    {" "}
                    ContactInfo: {property.contactInfo}{" "}
                  </li>
                  <li className="list-group-item">
                    {" "}
                    Availability: {property.availability}{" "}
                  </li>
                  <li className="list-group-item">
                    {" "}
                    Description: {property.description}{" "}
                  </li>
                </ul>
              </div> */}
            </div>
          </div>

          {/* <div className="">
            <p className="text-center">Google Map</p>
            <GoogleMap
              // address={property.address}
              coordinates={property.coordinates}
              price={property.price}
            />
          </div> */}

          {/* <div
            className=""
            // style={{ width: "100vw", height: "280px" }}
          > */}

          {/* </div> */}

          {/* <hr /> */}
        </Fragment>
      ) : (
        <h3> No Property</h3>
      )}
    </Fragment>
  );
};

ViewProperty.propTypes = {
  getProperty: PropTypes.func.isRequired,
  propertyState: PropTypes.object.isRequired,
  deleteImage: PropTypes.func.isRequired,
  findOnMap: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  authState: PropTypes.object.isRequired,
  property: PropTypes.object,
};

// ViewProperty.defaultProps = {
//   coordinate: {
//     lat: 34.052235,
//     lng: -118.243683,
//   },
// };

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
  authState: state.authReducer,
  // authState: state.authReducer,
});

export default connect(mapStateToProps, {
  getProperty,
  addLike,
  deleteImage,
  findOnMap,
})(withRouter(ViewProperty));
