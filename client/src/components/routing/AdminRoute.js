import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AdminRoute = ({
  component: Component,
  authState: { isAuth, loading, user },
  ...rest
}) => (
  // if(user){
  //   console.log(role)
  // }

  <Route
    {...rest}
    render={(props) =>
      !isAuth && !loading ? (
        <Redirect to="/auth" />
      ) : user && user.role === "admin" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

AdminRoute.propTypes = {
  authState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});
export default connect(mapStateToProps)(AdminRoute);
