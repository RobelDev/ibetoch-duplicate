import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyPropertys } from "../../../actions/propertyAction";
// import AddImage from "./AddImages";
import { Spinner } from "react-bootstrap";
import MyPropertyItem from "./MyPropertyItem";
// import ViewProperty from "../ViewProperty";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPropertys = ({
  propertyState: { mypropertys, loading },
  getMyPropertys,
}) => {
  useEffect(() => {
    getMyPropertys();
  }, [getMyPropertys]);

  if (loading) {
    return <Spinner animation="border" variant="primary" className="center" />;
  }

  return (
    <Fragment>
      <ToastContainer />
      <div className="container">
        <br />
        <h3>My Properties List</h3>

        <br />
        <Link to={`/createproperty`} className="btn btn-secondary">
          Create a new Property
        </Link>
        <br />
        <hr />

        <div className="grid-3">
          {!loading && mypropertys && mypropertys.length > 0 ? (
            mypropertys.map((property) => (
              <MyPropertyItem
                key={property._id}
                //prop_id="5ef69eb606cecd2df4afbd68"
                // prop_id={property._id}
                property={property}
              />
            ))
          ) : (
            <Fragment>
              <h3> No posted properties yet! </h3>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

// const style = {
//   display: "grid",
//   gridTemplateColumns: "repeat(2, 1fr)",
//   gridGap: "1rem",
// };

MyPropertys.propTypes = {
  getMyPropertys: PropTypes.func.isRequired,
  propertyState: PropTypes.object.isRequired,
  mypropertys: PropTypes.array,
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});
export default connect(mapStateToProps, { getMyPropertys })(MyPropertys);
