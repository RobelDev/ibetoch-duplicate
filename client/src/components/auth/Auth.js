import React, { Fragment, useState } from "react";

import Login from "./Login";
import Register from "./Register";
const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const showLoginPage = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const showRegisterPage = () => {
    setShowRegister(true);
    setShowLogin(false);
  };
  return (
    <Fragment>
      <section className="col-md-7 offset-md-3 mt-5">
        <div>
          <div className="row">
            <div
              className={
                "col-sm controller " + (showLogin && "selected-controller")
              }
              onClick={showLoginPage}
            >
              <h1 className="large text-primary">Sign In</h1>
            </div>

            <div
              className={
                "col-sm controller " + (showRegister && "selected-controller")
              }
              onClick={showRegisterPage}
            >
              <h1 className="large text-primary"> Register</h1>
            </div>
          </div>

          <div className="col">{showLogin ? <Login /> : <Register />}</div>
        </div>
      </section>
    </Fragment>
  );
};

export default Auth;
