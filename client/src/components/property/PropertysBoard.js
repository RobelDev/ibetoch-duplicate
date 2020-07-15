import React, { Fragment } from "react";
// import PropTypes from "prop-types";
import Search from "../search/Search";
import MySearchedPropertys from "./mysearchedpropertys/MySearchedPropertys";
// import GoogleMap from "./GoogleMap";

const PropertysBoard = (props) => {
  return (
    <Fragment>
      <div className=" container ">
        <Search />
      </div>
      <div className="ml-3 ">
        <MySearchedPropertys />
      </div>

      {/* <div className="row">
          <div className="col hide-sm hide-md">
            <div
              style={{
                width: "100%",
                height: "100vh",
              }}
            >
              {/* <GoogleMap /> */}

      {/* // <div className="col">
          //   <div style={{ width: "100%", height: "100vh" }}>
          //     <MySearchedPropertys />

          //     {/* {/* <Propertys  /> */}
    </Fragment>
  );
};

// PropertysBoard.propTypes = {};

export default PropertysBoard;
