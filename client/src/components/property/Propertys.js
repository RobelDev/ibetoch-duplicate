import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import { getPropertys } from "../../actions/propertyAction";
import { connect } from "react-redux";
import PropertysItem from "./PropertysItem";

const Propertys = ({ getPropertys, propertyState: { propertys, loading } }) => {
  useEffect(() => {
    getPropertys();
  }, [getPropertys, loading]);

  if (loading) {
    return <Spinner animation="border" variant="primary" className="center" />;
  }
  return (
    <Fragment>
      <div className="grid-3 ">
        {" "}
        {!loading && propertys.length > 0 ? (
          propertys.map((property) => (
            <PropertysItem
              key={property._id}
              // prop_id={property._id}
              property={property}
            />
          ))
        ) : (
          <h3>No propertys found</h3>
        )}
      </div>
    </Fragment>
  );
};

// const style = {
//   display: "grid",
//   gridTemplateColumns: "repeat(2, 1fr)",
//   gridGap: "1rem",
// };

Propertys.propTypes = {
  propertyState: PropTypes.object.isRequired,
  getPropertys: PropTypes.func.isRequired,
  // propertys: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { getPropertys })(Propertys);
