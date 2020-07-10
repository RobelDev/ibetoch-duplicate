import React, { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
//import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/layout/NavBar";
import Help from "./components/layout/Help";
import Landing from "./components/layout/Landing";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./components/auth/Auth";
import Activate from "./components/auth/Activate";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authAction";
import { setAuth } from "./components/auth/Helper";

// import DashBoard from "./components/board/DashBoard";
import AdminBoard from "./components/board/AdminBoard";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";

import Forgot from "./components/auth/Forgot";
import Reset from "./components/auth/Reset";
import MyPropertys from "./components/property/mypropertys/MyPropertys";
import CreateProperty from "./components/property/mypropertys/CreateProperty";
import UpdateProperty from "./components/property/mypropertys/UpdateProperty";

import PropertysBoard from "./components/property/PropertysBoard";

import AddImages from "./components/property/mypropertys/AddImages";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ViewProperty from "./components/property/ViewProperty";
import MyLikedPropertys from "./components/property/mylikedpropertys/MyLikedPropertys";
import Contactus from "./components/layout/Contactus";
import Terms from "./components/layout/Terms";
import Affilate from "./components/layout/Affilate";
import Partners from "./components/layout/Partners";
import Privacy from "./components/layout/Privacy";

if (localStorage.token) {
  setAuth(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const head = () => (
    <Helmet>
      <meta charSet="utf-8" />
      <title>I-Betoch</title>
      <link rel="canonical" href="https://www.ibetoch.com" />
    </Helmet>
  );

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {head()}
          <NavBar />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/auth" component={Auth}></Route>
            <Route
              exact
              path="/api/users/activate/:token"
              component={Activate}
            />

            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/api/users/reset/:token" component={Reset} />

            <Route exact path="/contactus" component={Contactus} />

            <Route exact path="/affilate" component={Affilate} />
            <Route exact path="/partners" component={Partners} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/privacypolicy" component={Privacy} />

            <Route exact path="/propertys" component={PropertysBoard} />
            <Route
              exact
              path="/propertys/viewproperty/:prop_id"
              component={ViewProperty}
            />
            {/* <PrivateRoute exact path="/dashboard" component={DashBoard} /> */}
            <Route exact path="/help" component={Help} />
            <PrivateRoute exact path="/mypropertys" component={MyPropertys} />
            <PrivateRoute
              exact
              path="/mylikedpropertys"
              component={MyLikedPropertys}
            />

            <PrivateRoute
              exact
              path="/createproperty"
              component={CreateProperty}
            />

            <PrivateRoute
              exact
              path="/updateproperty/:prop_id"
              component={UpdateProperty}
            />
            <PrivateRoute
              exact
              path="/addimages/:prop_id"
              component={AddImages}
            />

            {/* <PrivateRoute exact path="/myList" /> */}

            <AdminRoute exact path="/admin" component={AdminBoard} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
