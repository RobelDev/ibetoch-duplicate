import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLikedPropertys } from "../../../actions/propertyAction";
import PropertysItem from "../PropertysItem";
import { Spinner } from "react-bootstrap";

const MyLikedPropertys = ({
  getLikedPropertys,
  propertyState: { mylikedpropertys, loading },
}) => {
  useEffect(() => {
    getLikedPropertys();

    // let prop = mylikedpropertys.map((pro) => prop);
  }, [getLikedPropertys]);

  if (loading) {
    return <Spinner animation="border" variant="primary" className="center" />;
  }

  return (
    <Fragment>
      <div className="container">
        <br />
        <h3>My liked list properties</h3>
        <hr />
        <div className="grid-3 ">
          {!loading && mylikedpropertys && mylikedpropertys.length > 0 ? (
            mylikedpropertys.map((property) => (
              <PropertysItem key={property._id} property={property} />
            ))
          ) : (
            <h4>No Liked properties yet!</h4>
          )}
        </div>
      </div>
    </Fragment>
  );
};

MyLikedPropertys.propTypes = {
  getLikedPropertys: PropTypes.func.isRequired,
  propertyState: PropTypes.object.isRequired,
  mylikedpropertys: PropTypes.array,
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { getLikedPropertys })(
  MyLikedPropertys
);
