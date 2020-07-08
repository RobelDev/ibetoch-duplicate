import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Col, Row, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../../actions/authAction";
import { connect } from "react-redux";

const Reset = ({ authState: { isAuth, user }, match, resetPassword }) => {
  const [resetData, setResetData] = useState({
    token: "",
    newPassword: "",
    passwordConfirm: "",
    buttonText: "Reset Password",
  });

  useEffect(() => {
    let token = match.params.token;
    if (token) {
      setResetData({ ...resetData, token });
    }
    // eslint-disable-next-line
  }, []);

  const { token, newPassword, passwordConfirm, buttonText } = resetData;

  const onChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //make sure the password match
    if (newPassword !== passwordConfirm) {
      toast.error("Passwords do not match!");
    } else {
      //setResetData({ ...resetData, buttonText: "Reset Password" });
      resetPassword({ newPassword, token });
    }
  };

  // redirect if AUTHENTICATED in
  if (isAuth) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <ToastContainer />
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <div className="text-center">
          <h2 className="p-3 "> Please enter your new Password.</h2>
        </div>
        <Form onSubmit={onSubmit}>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="password"
                name="newPassword"
                value={newPassword}
                placeholder="Password"
                onChange={onChange}
                minLength="6"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPasswordCofirm">
            <Form.Label column sm={2}>
              Confirm Password
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={onChange}
                minLength="6"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" value="reset">
                {buttonText}
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </Fragment>
  );
};
Reset.propTypes = {
  resetPassword: PropTypes.func.isRequired,

  //activateAccount: PropTypes.func.isRequired,
  authState: PropTypes.object.isRequired,
  //isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, { resetPassword })(Reset);
