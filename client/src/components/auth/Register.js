import React, { Fragment, useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { connect } from "react-redux";
import { register } from "../../actions/authAction";
import Google from "./Google";
import Facebook from "./Facebook";

const Register = ({ register, isAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    buttonText: "Register/Signup",
  });

  const { name, email, password, passwordConfirm, buttonText } = formData;

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //make sure the password match

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
    } else {
      let allowSubmit = true;
      if (allowSubmit) {
        setFormData({ ...formData, buttonText: "Submitting" });
        register({ name, email, password });

        // setFormData({
        //   ...formData,
        //   buttonText: "Registering...",
        // });

        allowSubmit = false;
      } else {
        return false;
      }
    }
  };

  //redirect if AUTHENTICATED in
  // if (isAuth) {
  //   return <Redirect to="/dashboard" />;
  // }
  return (
    <Fragment>
      <div>
        <ToastContainer />
        <p className="lead">
          <i className="fas fa-user" /> Create an Account
        </p>
        <div className="text-center">
          <Google status="Register with Google" />
          <Facebook status="Register with Facebook" />
          {/* <Facebook /> */}
        </div>
        <hr />
        <Form onSubmit={onSubmit}>
          <Form.Group as={Row} controlId="formHorizontalName">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                name="name"
                value={name}
                placeholder="Name or company name"
                onChange={onChange}
                required
              />
            </Col>
          </Form.Group>
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
                required
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
                minLength="6"
                required
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
              <Button type="submit" value="register">
                {buttonText}
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  //isAuth: PropTypes.bool.isRequired,
};

// const mapStateToProps = (state) => ({
//   isAuth: state.authReducer.isAuth,
// });

export default connect(null, { register })(Register);
