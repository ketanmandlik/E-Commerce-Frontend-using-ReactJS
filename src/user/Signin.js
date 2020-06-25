import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Signin = () => {
  const [values, setValues] = useState({
    email: "ketanmandlik96@gmail.com",
    password: "6296",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: "",
      loading: true,
    });
    signin({
      email,
      password,
    }).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      }
    });
    //.catch(console.log("Sign in request fail"));
  };

  const { error } = values;
  console.log(error);
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    // if (isAuthenticated()) {
    //   return <Redirect to="/" />;
    // }
  };

  const signInFrom = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                value={email}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                value={password}
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-danger btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <Loader
          type="Grid"
          color="#00BFFF"
          height={100}
          width={100}
          secondaryColor="#FF3E4D"
          //timeout={3000} //3 secs
        />
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In Page" description="A page for user to Sign In">
      <div className="center">{loadingMessage()}</div>
      {signInFrom()}
      {errorMessage()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
