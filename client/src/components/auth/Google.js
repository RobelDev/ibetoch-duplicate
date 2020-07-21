import React, { Fragment } from "react";
//import config from "config";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";
import { googleResponse } from "../../actions/authAction";
import { connect } from "react-redux";

const Google = ({ googleResponse, status }) => {
  const responseGoogle = (response) => {
    const idToken = response.tokenId;
    googleResponse(idToken);
  };
  return (
    <Fragment>
      <GoogleLogin
        clientId="458987910995-e6up20bsk0sunbskslmpb7dt6b7p3kf2.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="btn btn-danger btn-lg btn-block"
          >
            <i className="fab fa-google pr-2" />{status}
          </button>
        )}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </Fragment>
  );
};

Google.propTypes = {
  googleResponse: PropTypes.func.isRequired,
};
export default connect(null, { googleResponse })(Google);
