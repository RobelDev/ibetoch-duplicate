import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Form, Col, Row, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../../actions/authAction";
import { connect } from "react-redux";

const Forgot = ({ forgotPassword }) => {
  const [forgotData, setForgotData] = useState({
    email: "",
    buttonText: "Request password reset link",
  });

  const { email, buttonText } = forgotData;

  const onChange = (e) => {
    setForgotData({ ...forgotData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    forgotPassword({ email });

    //loadUser();
    setForgotData({
      ...forgotData,
      buttonText: "Request password reset link",
    });
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <div className="text-center">
          <h2 className="p-3 ">
            {" "}
            Forgot Password. Please enter your email to get a password reset
            link.
          </h2>
        </div>
        <Form onSubmit={onSubmit}>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={onChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" value="forgot">
                {buttonText}
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </Fragment>
  );
};

Forgot.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  //activateAccount: PropTypes.func.isRequired,
  authState: PropTypes.object.isRequired,
  //isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, { forgotPassword })(Forgot);
