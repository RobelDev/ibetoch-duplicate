import React, { Fragment, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Col, Row, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { connect } from "react-redux";
import { login, loadUser } from "../../actions/authAction.js";
import Google from "./Google";
import Facebook from "./Facebook";

const Login = ({ login, loadUser, authState: { isAuth, msg } }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    buttonText: "Sign in",
  });

  const { email, password, buttonText } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
    //setFormData({ ...formData, buttonText: "Submitted" });
  };

  //redirect if signed in/authenticated user
  if (isAuth) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <ToastContainer />
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>

      <div className="text-center">
        <Google />
        <Facebook />
        {/* <Facebook /> */}
      </div>
      <hr />
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

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </Col>
        </Form.Group>

        {/* <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" onChange={onChange} />
          </Col>
        </Form.Group> */}

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" value="login">
              {buttonText}
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <Link to="/forgot" className="btn btn-sm btn-outline-danger">
        Forgot password?
      </Link>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  //loadUser: PropTypes.func.isRequired,
  //isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});
export default connect(mapStateToProps, { login, loadUser })(Login);
