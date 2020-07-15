import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import { getSearchedPropertys } from "../../../actions/propertyAction";
import { connect } from "react-redux";

import PropertysItem from "../PropertysItem";
import Propertys from "../Propertys";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MySearchedPropertys = ({
  getSearchedPropertys,
  propertyState: { mysearchedpropertys, loading },
}) => {
  useEffect(() => {
    getSearchedPropertys();
  }, [getSearchedPropertys]);

  if (loading) {
    return <Spinner animation="border" variant="primary" className="center" />;
  }

  return (
    <Fragment>
      <ToastContainer />
      <div className="grid-4 my-4">
        {!loading && mysearchedpropertys && mysearchedpropertys.length > 0 ? (
          mysearchedpropertys.map((property) => (
            <PropertysItem key={property._id} property={property} />
          ))
        ) : (
          <Propertys />
        )}
      </div>
    </Fragment>
  );
};

MySearchedPropertys.propTypes = {
  propertyState: PropTypes.object.isRequired,
  getSearchedPropertys: PropTypes.func.isRequired,
  mysearchedpropertys: PropTypes.array,
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { getSearchedPropertys })(
  MySearchedPropertys
);
