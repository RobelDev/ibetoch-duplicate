import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { activateAccount } from "../../actions/authAction";
import { connect } from "react-redux";

const Activate = ({ authState: { isAuth }, match, activateAccount }) => {
  const [activateToken, setActivateToken] = useState({
    token: "",
    // show: true,
  });

  useEffect(() => {
    let token = match.params.token;

    if (token) {
      setActivateToken({ ...activateToken, token });
    }
    // eslint-disable-next-line
  }, []);

  const { token } = activateToken;

  const onSubmit = async (e) => {
    e.preventDefault();
    activateAccount(token);
    //setActivateToken({ ...activateToken, show: false });
  };

  //redirect if AUTHENTICATED in
  if (isAuth) {
    return <Redirect to="/auth" />;
  }
  return (
    <Fragment>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <div className="text-center">
          <h2 className="p-3 "> Welcome to iBetoch! Activate Your Account</h2>
          <button className="btn btn-outline-primary" onClick={onSubmit}>
            Activate/Verify Account
          </button>
        </div>
      </div>
    </Fragment>
  );
};

Activate.propTypes = {
  activateAccount: PropTypes.func.isRequired,
  //isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, { activateAccount })(Activate);
