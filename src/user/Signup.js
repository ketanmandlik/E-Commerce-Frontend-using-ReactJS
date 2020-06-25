import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    error: "error",
    loading: false,
    success: false,
  });

  const { name, lastname, email, password, error, loading, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signup({
      name,
      lastname,
      email,
      password,
    }).then((data) => {
      console.log(data);
      if (data.errors) {
        setValues({
          ...values,
          error: data.errors,
          loading: false,
          success: false,
        });
        console.log(values.error);

        console.log(data.errors[0].msg);
      } else {
        setValues({
          ...values,
          name: "",
          lastname: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          success: true,
        });
        console.log(error);
      }
    });
  };

  const signUpForm = () => {
    return (
      <div className="row margin-top-M">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Last Name</label>
              <input
                className="form-control"
                onChange={handleChange("lastname")}
                type="text"
                value={lastname}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-info btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account Created Successfully. Please
            <Link to="/signin"> Login Here</Link>
          </div>
        </div>
      </div>
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

  const loadingMessage = () => {
    return (
      loading && (
        <Loader
          type="Bars"
          color="#FF3E4D"
          height={100}
          width={100}
          //secondaryColor="#FF3E4D"
          //timeout={3000} //3 secs
        />
      )
    );
  };

  const val = () => {
    console.log(values);
  };
  return (
    <Base title="Sign Up Page" description="A page for user to Sign Up">
      <div className="center">{loadingMessage()}</div>
      {successMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
      <p className="text-white text-center">{val()}</p>
    </Base>
  );
};

export default Signup;
