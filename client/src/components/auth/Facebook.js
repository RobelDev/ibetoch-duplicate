import React, { Fragment } from "react";
//import config from "config";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { facebookResponse } from "../../actions/authAction";
import { connect } from "react-redux";

const Facebook = ({ facebookResponse }) => {
  const responseFacebook = (response) => {
    const userID = response.userID;
    const accessToken = response.accessToken;
    facebookResponse({ userID, accessToken });
  };
  return (
    <Fragment>
      <FacebookLogin
        appId="627167738008047"
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="btn btn-primary btn-lg btn-block"
          >
            <i className="fab fa-facebook pr-2" /> Login with Facebook
          </button>
        )}
      />
    </Fragment>
  );
};

Facebook.propTypes = {
  facebookResponse: PropTypes.func.isRequired,
};
export default connect(null, { facebookResponse })(Facebook);
