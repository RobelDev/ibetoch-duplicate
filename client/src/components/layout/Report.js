// import React, { Fragment, useState, useEffect } from "react";
// import PropTypes from "prop-types";
// // import { SMTPClient } from "emailjs";
// import { Link } from "react-router-dom";
// import Footer from "./Footer";
// import { report } from "../../actions/propertyAction";
// import { connect } from "react-redux";
// import { Form, Col, Row, Modal, Button } from "react-bootstrap";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.min.css";

// const Report = ({ match, report, authState: { isAuth } }) => {
//   const [formData, setFormData] = useState({
//     reason: "",
//     prop_id: "",

//     buttonText: "Report",
//   });

//   const { reason, prop_id, buttonText } = formData;

//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     let prop_id = match.params.prop_id;

//     if (prop_id) {
//       setFormData({ ...formData, prop_id });
//       //getProperty(prop_id);
//     }
//     // eslint-disable-next-line
//   }, []);

//   const onChange = (e) => {
//     e.preventDefault();
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmitReport = async (e) => {
//     e.preventDefault();
//     //make sure the password match
//     if (!isAuth) {
//       return toast.error("Please sign in first to report a property!");
//     }
//     if (reason === "") {
//       return toast.error("Please pick a reason before submitting!");
//     } else {
//       setFormData({ ...formData, buttonText: "Reporting" });
//       report({ reason, prop_id });

//       setFormData({
//         ...formData,
//         buttonText: "Reported",
//       });
//     }
//   };
//   return (
//     <Fragment>
//       <ToastContainer />
//       <div className="container shadow-lg p-3 mb-5 bg-white rounded">
//         {/* <h1>
//           {" "}
//           <i className="fa fa-envelope" /> Contact Us
//         </h1>
//         <hr />
//         <p>
//           We welcome every question and issues. If you encounter website bugs or
//           issues please use this form.{" "}
//         </p>
//         <strong>
//           {!isAuth && (
//             <h5>
//               <hr />
//               Please <Link to="/auth">Sign in or Join</Link> First to write us a
//               message.
//               <br />
//             </h5>
//           )}
//         </strong> */}

//         {/* <div
//           className="shadow p-3 mb-5 bg-white rounded "
//           style={{
//             alignContent: "center",
//             justifyContent: "center",
//             width: "22rem",
//             height: "22rem",
//             display: "grid",
//           }}
//         >
//           <h4>Email us: team@ibetoch.com</h4>
//         </div> */}
//         {/* <h5>
//           {" "}
//           Please be as describtive as possible Thank you for reaching out.{" "}
//           <i className="fa fa-arrow-down" />{" "}
//         </h5>
//         <hr /> */}

//         <div className="report">
//           <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//               <Modal.Title>Report a property</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {" "}
//               <div
//                 className="card"
//                 // style={{ width: "22rem", height: "28rem" }}
//                 onDoubleClick={handleShow}
//               >
//                 {/* <div className="card-body"> */}
//                 <div className="card-body my-n5 mb-1 p-2 float-left">
//                   <Form onSubmit={onSubmit}>
//                     <Form.Row>
//                       <Form.Group
//                         as={Col}
//                         controlId="exampleForm.ControlSelect1"
//                       >
//                         <Form.Label column sm={2}>
//                           Report:
//                         </Form.Label>

//                         <Form.Control
//                           as="select"
//                           // defaultValue="homeType"
//                           name="reason"
//                           value={reason}
//                           onChange={onChange}
//                           required
//                         >
//                           <option>It is not real property</option>
//                           <option>I won this property</option>
//                           <option>Not appropriate post</option>
//                           <option>townhouses</option>
//                           <option>other</option>
//                         </Form.Control>
//                       </Form.Group>
//                     </Form.Row>

//                     <Form.Group as={Row}>
//                       <Col sm={{ span: 10, offset: 2 }}>
//                         <Button
//                           type="submit"
//                           value="register"
//                           className="btn btn-primary btn-lg"
//                         >
//                           {buttonText}
//                         </Button>
//                       </Col>
//                     </Form.Group>
//                   </Form>

//                   <br />
//                   <br />
//                   <br />
//                 </div>
//               </div>
//             </Modal.Body>

//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleClose}>
//                 Close
//               </Button>

//               <Button variant="secondary" onClick={onSubmit}>
//                 {buttonText}
//               </Button>
//               {/* <a
//               href={`/property/report`}
//               //variant="primary"
//               className="btn btn-primary"
//             >
//               View
//             </a> */}
//             </Modal.Footer>
//           </Modal>
//         </div>
//       </div>

//       <Footer />
//     </Fragment>
//   );
// };

// Report.propTypes = {
//   report: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   authState: state.authReducer,
// });
// export default connect(mapStateToProps, { report })(Report);
