import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import logo from "../../siteImages/android-chrome-512x512.png";

const NavBar = ({ history, authState: { isAuth, loading, user }, logout }) => {
  const isActive = (path) => {
    if (history.location.pathname === path) {
      return { color: "#000", borderBottom: "2px solid" };
    } else {
      return { color: "#4285f4" };
    }
  };

  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const logoutFun = () => {
    logout();
  };

  const guestLinks = (
    <ul className="navbar-nav ml-auto mt-2 mb-n1">
      <li className="nav-item">
        <Link to="/" className="nav-link mr-3" style={isActive("/")}>
          {" "}
          <i className="fa fa-home" /> Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/propertys"
          className="nav-link mr-3"
          style={isActive("/propertys")}
        >
          {" "}
          <i className="fa fa-building " /> Betoch Posts
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/affilate"
          className="nav-link mr-3"
          style={isActive("/affilate")}
        >
          {" "}
          <i className="fa fa-handshake" /> Work with iBetoch
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/help" className="nav-link mr-3" style={isActive("/help")}>
          {" "}
          <i className="fa fa-question-circle" /> Help
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/auth" className="nav-link mr-3" style={isActive("/auth")}>
          {" "}
          <i className="fas fa-sign-in-alt" /> Signin or Join
        </Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className="navbar-nav ml-auto mt-2 mb-n1">
      <li className="nav-item">
        <Link to="/" className="nav-link mr-3" style={isActive("/")}>
          {" "}
          <i className="fa fa-home" /> Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/propertys"
          className="nav-link mr-3"
          style={isActive("/propertys")}
        >
          {" "}
          <i className="fa fa-building " /> Betoch Posts
        </Link>
      </li>

      {/* <li className="nav-item">
        <Link to="/buy" className="nav-link">
          {" "}
          <i className="fa fa-home" /> Buy
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/sell" className="nav-link">
          {" "}
          <i className="fa fa-home" /> Sell
        </Link>
      </li> */}
      <li className="nav-item">
        <Link
          to="/mypropertys"
          className="nav-link mr-3"
          style={isActive("/mypropertys")}
        >
          {" "}
          <i className="fas fa-paint-roller	" /> My Betoch Board
        </Link>
      </li>
      {/* <li className="nav-item">
        <Link to="/dashboard" className="nav-link">
          {" "}
          <i className="fa fa-building" /> DashBoard
        </Link>
      </li> */}

      <li className="nav-item">
        <Link
          to="/mylikedpropertys"
          className="nav-link mr-3"
          style={isActive("/mylikedpropertys")}
        >
          {" "}
          <i className="fa fa-tasks" /> My Liked List
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/help" className="nav-link mr-3" style={isActive("/help")}>
          {" "}
          <i className="fa fa-question-circle" /> Help
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/affilate"
          className="nav-link mr-3"
          style={isActive("/affilate")}
        >
          {" "}
          <i className="fa fa-handshake" /> Work with iBetoch
        </Link>
      </li>

      <li className="nav-item">
        <div className=" nav-link text-secondary mr-3">
          {" "}
          Hello {user && user.name.toLowerCase()}
        </div>
      </li>

      <li className="nav-item">
        <Link
          to="/auth"
          className="nav-link mr-3"
          onClick={logoutFun}
          style={isActive("/#")}
        >
          {" "}
          <i className="fas fa-sign-out-alt" /> Signout
        </Link>
      </li>
    </ul>
  );

  //work on admin links later

  // const adminLinks = (
  //   <ul className="navbar-nav mr-auto">

  //     <li className="nav-item">
  //       <Link to="/help" className="text-light nav-link">
  //         {" "}
  //         <i className="fa fa-question-circle" /> Help
  //       </Link>
  //     </li>

  //     <li className="nav-item">
  //       <Link to="#!" className="nav-link" onClick={logoutFun}>
  //         {" "}
  //         <i className="fas fa-sign-out-alt" /> Signout
  //       </Link>
  //     </li>
  //   </ul>
  // );
  const show = toggle && "show";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <h2 className="navbar-brand ">
        {/* <Link to="/" className="navbar-brand text-primary mb-n2"> */}{" "}
        <img src={logo} alt="logo" style={{ width: "32px", height: "32px" }} />{" "}
        iBetoch
        {/* </Link> */}
        <p className="text-danger">
          {" "}
          <small>Officially Release Aug 2020. </small>
        </p>
      </h2>
      <button className="navbar-toggler" type="button" onClick={onToggle}>
        {" "}
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={"collapse navbar-collapse " + show}>
        {!loading && <Fragment>{isAuth ? authLinks : guestLinks}</Fragment>}
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  authState: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});
export default connect(mapStateToProps, { logout })(withRouter(NavBar));
