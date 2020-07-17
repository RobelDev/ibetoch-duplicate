import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getSearchedPropertys } from "../../actions/propertyAction";

import { Form, FormControl, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
// import PropertysItem from "../property/PropertysItem";

const Search = ({ getSearchedPropertys }) => {
  const [searchData, setSearchData] = useState({
    address: "",
    purpose: "rent",
    bedroom: 1,
    bathroom: 1,
    homeType: "house",
  });

  const { address, purpose, bedroom, bathroom, homeType } = searchData;

  // useEffect(() => {
  //   // getSearchedPropertys(address, purpose, bedroom, bathroom, homeType);
  // }, [getSearchedPropertys, address, purpose, bedroom, bathroom, homeType]);

  // .substr(0, 22)

  const onChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };
  const onSearch = (e) => {
    e.preventDefault();

    if (address === "") {
      toast.error("Please enter an address!");
      console.log("Enter address please");
    } else {
      getSearchedPropertys(address, purpose, bedroom, bathroom, homeType);
    }
  };

  return (
    <Fragment>
      <Form className="ml-5 mt-3">
        <FormControl
          name="address"
          value={address}
          onChange={onChange}
          placeholder="Enter an address or a city"
          className="mt- "
          style={{
            float: "",
            width: "320px",

            border: "1px solid transparent",
            fontSize: "21px",
            color: "black",
          }}
          required
        />
        {/* <input /> */}
        <br />
        <br />
        <Form.Row>
          <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
            <Form.Label column sm={2}>
              HomeType:
            </Form.Label>
            {/* <Col sm={10}> */}
            <Form.Control
              size="sm"
              as="select"
              // defaultValue="house"
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
            {/* </Col> */}
          </Form.Group>

          <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
            <Form.Label column sm={1}>
              Purpose
            </Form.Label>
            {/* <Col sm={10}> */}
            <Form.Control
              size="sm"
              as="select"
              // defaultValue="rent"
              name="purpose"
              value={purpose}
              onChange={onChange}
              required
            >
              <option>rent</option>
              <option>sell</option>
            </Form.Control>
            {/* </Col> */}
          </Form.Group>
          {/* </Form.Row> */}

          {/* <Form.Row> */}
          <Form.Group as={Col}>
            <Form.Label column sm={1}>
              BedRoom
            </Form.Label>
            <Col sm={6}>
              <Form.Control
                size="sm"
                type="number"
                name="bedroom"
                value={bedroom}
                placeholder=""
                onChange={onChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label column sm={1}>
              BathRoom
            </Form.Label>
            <Col sm={6}>
              <Form.Control
                size="sm"
                type="number"
                name="bathroom"
                value={bathroom}
                placeholder=""
                onChange={onChange}
              />
            </Col>
          </Form.Group>
        </Form.Row>

        <Button
          // type="submit"
          className="btn btn-light text-primary"
          onClick={onSearch}
          style={{
            fontSize: "18px",
            width: "10rem",
          }}
        >
          <i className="fas fa-search" /> search
        </Button>
      </Form>
      {/* </Form> */}
    </Fragment>
  );
};

Search.propTypes = {
  // propertyState: PropTypes.object.isRequired,
  getSearchedPropertys: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   propertyState: state.propertyReducer,
// });

export default connect(null, { getSearchedPropertys })(Search);
