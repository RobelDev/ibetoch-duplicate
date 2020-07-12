import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
// import { SMTPClient } from "emailjs";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { contactUs } from "../../actions/propertyAction";
import { connect } from "react-redux";
import { Form, Col, Row, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Contactus = ({ contactUs, authState: { isAuth } }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    buttonText: "Send",
  });

  const { name, email, message, subject, buttonText } = formData;

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //make sure the password match
    if (!isAuth) {
      return toast.error("Please sign in first to message/contact us!");
    }
    if (message === "") {
      return toast.error("Please write message before submitting!");
    } else {
      setFormData({ ...formData, buttonText: "Sending" });
      contactUs({ name, email, subject, message });

      setFormData({
        ...formData,
        buttonText: "Sent",
      });
    }
  };
  return (
    <Fragment>
      <ToastContainer />
      <div className="container shadow-lg p-3 mb-5 bg-white rounded">
        <div className="ml-1 pl-1">
          <h1 className="text-center mt-2">
            {" "}
            <i className="fa fa-envelope" /> Contact Us
          </h1>
          <hr />
          <p>
            We welcome every question and issues. If you encounter website bugs
            or issues please use this form.{" "}
          </p>
          <strong>
            {!isAuth && (
              <h5>
                <hr />
                Please <Link to="/auth">Sign in or Join</Link> First to write us
                a message.
                <br />
              </h5>
            )}
          </strong>

          {/* <div
          className="shadow p-3 mb-5 bg-white rounded "
          style={{
            alignContent: "center",
            justifyContent: "center",
            width: "22rem",
            height: "22rem",
            display: "grid",
          }}
        >
          <h4>Email us: team@ibetoch.com</h4>
        </div> */}
          <h5>
            {" "}
            Please be as describtive as possible Thank you for reaching out.{" "}
            <i className="fa fa-arrow-down" />{" "}
          </h5>
          <hr />

          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} controlId="formHorizontalName">
              <Form.Label column sm={1}>
                Name
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Name"
                  onChange={onChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={1}>
                Email From
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

            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={1}>
                Email to
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  type="email"
                  name="email"
                  value="team@ibetoch.com"
                  placeholder="team@ibetoch.com"
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalName">
              <Form.Label column sm={1}>
                Subject
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  type="text"
                  name="subject"
                  value={subject}
                  placeholder="Subject"
                  onChange={onChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalDescription">
              <Form.Label column sm={1}>
                Message
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="message"
                  value={message}
                  placeholder="write your message here please!"
                  onChange={onChange}
                  rows="8"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col>
                <Button type="submit" value="register" className="btn-block">
                  <i className="fa fa-paper-plane" /> {buttonText}
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

Contactus.propTypes = {
  contactUs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});
export default connect(mapStateToProps, { contactUs })(Contactus);
