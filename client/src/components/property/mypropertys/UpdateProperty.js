import React, { useState, Fragment, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { updateProperty, getProperty } from "../../../actions/propertyAction";
import { connect } from "react-redux";
import { Form, Col, Row, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const UpdateProperty = ({
  updateProperty,
  getProperty,
  match,
  history,
  propertyState: { property, loading },
}) => {
  const [formData, setFormData] = useState({
    price: "",
    totalSquareFt: "",
    yearBuilt: "",
    address: "",
    company: "",
    website: "",
    description: "",
    homeType: "",
    purpose: "",
    contactInfo: "",
    availability: "",
    // sold: false,
    bathroom: "",
    bedroom: "",
    parking: "",
    buttonText: "Submit",
  });

  const {
    prop_id,
    price,
    totalSquareFt,
    yearBuilt,
    address,
    company,
    website,
    description,
    homeType,
    purpose,
    contactInfo,
    availability,
    bathroom,
    bedroom,
    parking,
    buttonText,
  } = formData;

  // when update button is clicked on oroperty item it should take me to updateproperty/:prop_id
  // then i will get the prop_id from the params and get the property by prop_id from backend

  useEffect(() => {
    let prop_id = match.params.prop_id;
    if (prop_id) {
      setFormData({ ...formData, prop_id });
      if (!property || prop_id !== property._id) {
        getProperty(prop_id);
      }
      //getProperty(prop_id);
    }

    if (!loading && property && prop_id === property._id) {
      //getProperty(prop_id);
      const initialData = { ...formData };
      for (const indexKey in property) {
        if (indexKey in initialData) {
          initialData[indexKey] = property[indexKey];
          setFormData(initialData);
        }
        // setFormData(initialData);
      }
    }

    // eslint-disable-next-line
  }, [getProperty, property, loading]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //setFormData({ ...formData, buttonText: "Submitting" });
    updateProperty({ formData, prop_id, history });
    setFormData({
      ...formData,
      buttonText: "Updated",
    });
  };

  return (
    <Fragment>
      <div className="container shadow-lg p-4 mb-4 bg-light">
        <div className="mt-4 mb-4">
          <h3>Property Form </h3>
        </div>
        <ToastContainer />
        <Form onSubmit={onSubmit}>
          <Form.Group as={Row} controlId="formHorizontalTotalSF">
            <Form.Label column sm={2}>
              Total Square m:
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="number"
                name="totalSquareFt"
                value={totalSquareFt}
                placeholder="Enter total area, like 1450"
                onChange={onChange}
                required
              />
              <small>In square meter. Ex: 1450</small>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalYearBuilt">
            <Form.Label column sm={2}>
              Year Built:
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="number"
                name="yearBuilt"
                value={yearBuilt}
                placeholder="Enter property year built"
                onChange={onChange}
                required
              />
              <small>Ex: 2010</small>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPrice">
            <Form.Label column sm={2}>
              Price:
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="number"
                name="price"
                value={price}
                placeholder="Enter a price value"
                onChange={onChange}
                required
              />
              <small>
                In US dollar. If for rent put a monthly price. If for sell put a
                total price value.{" "}
              </small>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAddress">
            <Form.Label column sm={2}>
              Address:
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="text"
                name="address"
                value={address}
                placeholder="1600 Amphitheatre Pkqy, Mountain View 94043, CA , USA"
                onChange={onChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
              <Form.Label column sm={2}>
                HomeType:
              </Form.Label>

              <Form.Control
                as="select"
                name="homeType"
                value={homeType}
                onChange={onChange}
                required
              >
                <option>house</option>
                <option>apartment</option>
                <option>condo</option>
                <option>townhouses</option>
                <option>other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
              <Form.Label column sm={2}>
                I'm
              </Form.Label>

              <Form.Control
                as="select"
                name="company"
                value={company}
                onChange={onChange}
                required
              >
                <option>owner</option>
                <option>agent</option>
                <option>company</option>
                <option>open space</option>
                <option>other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
              <Form.Label column sm={2}>
                Purpose
              </Form.Label>

              <Form.Control
                as="select"
                name="purpose"
                value={purpose}
                onChange={onChange}
                required
              >
                <option>rent</option>
                <option>sell</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label column sm={2}>
                BedRoom
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="number"
                  name="bedroom"
                  value={bedroom}
                  placeholder=""
                  onChange={onChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label column sm={2}>
                BathRoom
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="number"
                  name="bathroom"
                  value={bathroom}
                  placeholder=""
                  onChange={onChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label column sm={2}>
                Parking
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="number"
                  name="parking"
                  value={parking}
                  placeholder=""
                  onChange={onChange}
                  required
                />
              </Col>
            </Form.Group>
          </Form.Row>

          <Form.Group as={Row} controlId="formHorizontalAvailability">
            <Form.Label column sm={2}>
              Availabile from:
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="date"
                name="availability"
                value={availability}
                onChange={onChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalContactinfo">
            <Form.Label column sm={2}>
              Contact Info
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                as="textarea"
                row="3"
                type="text"
                name="contactInfo"
                value={contactInfo}
                placeholder="put some contact informations"
                onChange={onChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalWebsite">
            <Form.Label column sm={2}>
              Website
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="text"
                name="website"
                value={website}
                placeholder="website"
                onChange={onChange}
              />
              <small>Optional</small>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalDescription">
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                as="textarea"
                type="text"
                name="description"
                value={description}
                placeholder="write key description about the property please"
                onChange={onChange}
                rows="4"
                required
              />
            </Col>
          </Form.Group>

          {/* <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Link>
                <Button
                  type="reset"
                  value="reset"
                  className="btn btn-danger btn-sm"
                >
                  Reset
                </Button>
              </Link>
            </Col>
          </Form.Group> */}

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Link to="/mypropertys">
                <Button
                  type="button"
                  value="Go Back"
                  className="btn btn-secondary btn-sm"
                >
                  Go Back
                </Button>
              </Link>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                type="submit"
                value="register"
                className="btn btn-primary btn-lg"
              >
                {buttonText}
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </Fragment>
  );
};

UpdateProperty.propTypes = {
  updateProperty: PropTypes.func.isRequired,
  getProperty: PropTypes.func.isRequired,
  propertyState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

//const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { updateProperty, getProperty })(
  withRouter(UpdateProperty)
);
