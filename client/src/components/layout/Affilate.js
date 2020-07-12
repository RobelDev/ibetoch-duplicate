import React, { Fragment, useState } from "react";
import Footer from "./Footer";
import PropTypes from "prop-types";
// import { SMTPClient } from "emailjs";
import { Link } from "react-router-dom";
import { affilate } from "../../actions/propertyAction";
import { connect } from "react-redux";
import { Form, Col, Row, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Affilate = ({ affilate, authState: { isAuth } }) => {
  const [formData, setFormData] = useState({
    name: "",
    social: "",
    email: "",
    subject: "",
    message: "",
    buttonText: "Send",
  });

  const { name, social, email, message, subject, buttonText } = formData;

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //make sure the password match
    if (!isAuth) {
      return toast.error("Please sign in first for bussiness inquiries!");
    }
    if (message === "") {
      return toast.error("Please write message before submitting!");
    } else {
      setFormData({ ...formData, buttonText: "Sending" });
      affilate({ name, social, email, subject, message });

      setFormData({
        ...formData,
        buttonText: "Sent",
      });
    }
  };

  return (
    <Fragment>
      <div className="container shadow-lg p-3 mb-5 bg-white rounded">
        <ToastContainer />
        <div className="ml-1 pl-1">
          <div className="text-center mt-2">
            <h1>
              {" "}
              <i className="fa fa-handshake" /> Become An Affilate/Advertise{" "}
              <br />
              Or Approved
            </h1>
          </div>
          <hr />

          <p>
            If you are social media influencer, entrepreneur, self-employed
            real-estate agent, small or big company, bussiness-person, or
            real-estate owner and you want to work with us for different reason
            such as get approved by us, to advertise your property, or become an
            affilate, please reach out to us.
          </p>

          <strong>
            {!isAuth && (
              <h5>
                <hr />
                Please <Link to="/auth">Sign in or Join</Link> First to work
                with iBetoch.
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

            <Form.Group as={Row} controlId="formHorizontalName">
              <Form.Label column sm={1}>
                Company name
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  type="text"
                  name="social"
                  value={social}
                  placeholder="include social media/company names"
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

            <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
              <Form.Label column sm={1}>
                Subject
              </Form.Label>

              <Form.Control
                as="select"
                // defaultValue="homeType"
                name="subject"
                value={subject}
                onChange={onChange}
                required
              >
                <option aria-disabled>choose</option>
                <option>Get Approved/Badge</option>
                <option>Advertise</option>
                <option>Become An Affilate</option>
                <option>other bussiness inquiry</option>
                {/* <option>Violates the community standard</option> */}
              </Form.Control>
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

Affilate.propTypes = {
  affilate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, { affilate })(Affilate);
