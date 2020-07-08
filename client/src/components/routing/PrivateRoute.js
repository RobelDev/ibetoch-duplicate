import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  authState: { isAuth, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuth && !loading ? <Redirect to="/auth" /> : <Component {...props} />
    }
  />
);

PrivateRoute.propTypes = {
  authState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});
export default connect(mapStateToProps)(PrivateRoute);
