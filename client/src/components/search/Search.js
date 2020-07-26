import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getSearchedPropertys } from "../../actions/propertyAction";

import { Form, FormControl, Col, Button, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import Paginate from "../layout/Paginate";
import MySearchedPropertys from "../property/mysearchedpropertys/MySearchedPropertys";

const Search = ({ getSearchedPropertys, page: { next } }) => {
  const [searchData, setSearchData] = useState({
    address: "",
    purpose: "",
    bedroom: 1,
    bathroom: 1,
    homeType: "",
    page: 1,
    limit: 9,
  });

  const {
    address,
    purpose,
    bedroom,
    bathroom,
    homeType,
    page,
    limit,
  } = searchData;

  // let pageA = [];
  // for (let i = 1; i <= pageNum; i++) {
  //   pageA.push(i);
  // }

  // let active = 2;
  // let items = [];
  let pageNum;

  if (next && next.pageNum) {
    pageNum = next.pageNum;
  }

  let pageA = [];
  for (let i = 1; i <= pageNum; i++) {
    pageA.push(i);
  }

  // const paginationBasic = (
  //   <div>
  //     <Pagination>{items}</Pagination>
  //     <br />
  //   </div>
  // );

  const onChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // if (address === "") {
    //   setSearchData({ ...searchData, address: "address" });
    //   getSearchedPropertys(
    //     address,
    //     purpose,
    //     bedroom,
    //     bathroom,
    //     homeType,
    //     page,
    //     limit
    //   );
    //   toast.error("Please enter an address!");
    //   console.log("Enter address please");
    // } else {
    // const limit = 20;
    // const page = 1;
    // onSearch();
    getSearchedPropertys(
      address,
      purpose,
      bedroom,
      bathroom,
      homeType,
      page,
      limit
    );
  }, [page]);

  const onSearch = (e) => {
    e.preventDefault();

    // if (address === "") {
    //   toast.error("Please enter an address!");
    //   console.log("Enter address please");
    // } else {
    // const limit = 20;
    // const page = 1;
    getSearchedPropertys(
      address,
      purpose,
      bedroom,
      bathroom,
      homeType,
      page,
      limit
    );
    // }
  };

  return (
    <Fragment>
      <Form className="ml- mt-3">
        <FormControl
          name="address"
          value={address}
          onChange={onChange}
          placeholder="Enter an address or a city here"
          className="mt-4 mb-"
          style={{
            float: "",
            width: "310px",
            border: "0.5px medium ",
            fontSize: "17px",
            color: "black",
          }}
          required
        />
        {/* <input /> */}
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
              <option aria-disabled></option>
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
              <option aria-disabled></option>
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
        <br />
      </Form>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-2">
          {pageA.length > 0 &&
            pageA.map((num) => (
              <li className="page-item " key={num}>
                <Link
                  className="page-link "
                  to="#!"
                  onClick={() => setSearchData({ ...searchData, page: num })}
                >
                  {num}
                </Link>
              </li>
            ))}
        </ul>
      </nav>

      <MySearchedPropertys />

      <nav aria-label="Page navigation example">
        <ul className="pagination pg-blue justify-content-center mt-2">
          {pageA.length > 0 &&
            pageA.map((num) => (
              <li className="page-item " key={num}>
                <Link
                  className="page-link "
                  to="#!"
                  onClick={() => setSearchData({ ...searchData, page: num })}
                >
                  {num}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </Fragment>
  );
};

Search.propTypes = {
  // propertyState: PropTypes.object.isRequired,
  getSearchedPropertys: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  page: state.propertyReducer.page,
});

export default connect(mapStateToProps, { getSearchedPropertys })(Search);
