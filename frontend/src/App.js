import React from "react";
import {  BrowserRouter as Router,  Route,  Switch,  Redirect,} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import AddAdPage from "./components/AddAdPage";
import MyAds from "./components/MyAds";
import CalculatorPage from "./components/CalculatorPage";


const isLoggedIn = () => {
  return !!localStorage.getItem("username");
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/calc" component={CalculatorPage} />
          <PrivateRoute path="/my-ads" component={MyAds} />
          <PrivateRoute path="/add-new" component={AddAdPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
