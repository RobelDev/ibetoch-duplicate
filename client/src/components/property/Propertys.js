import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Spinner, Pagination } from "react-bootstrap";
import { getPropertys } from "../../actions/propertyAction";
import { connect } from "react-redux";
import PropertysItem from "./PropertysItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Propertys = ({
  getPropertys,
  propertyState: { propertys, loading, page },
}) => {
  const [pageUp, setPage] = useState(1);
  useEffect(() => {
    const limit = 4;
    // const page = 1;
    getPropertys(pageUp, limit);
  }, [getPropertys, loading, pageUp]);

  let active = 2;
  let items = [];
  for (let number = 1; number <= page.pageNum; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div>
      <Pagination>{items}</Pagination>
      <br />
    </div>
  );

  if (loading) {
    return <Spinner animation="border" variant="primary" className="center" />;
  }
  return (
    <Fragment>
      <ToastContainer />

      <div className="grid-4">
        {
          !loading &&
            propertys &&
            propertys.length > 0 &&
            propertys.map((property) => (
              <PropertysItem key={property._id} property={property} />
            ))
          // : (
          //   <h3>No propertys found</h3>
          // )
        }
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
  propertys: PropTypes.array,
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { getPropertys })(Propertys);
