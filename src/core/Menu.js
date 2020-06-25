/* eslint-disable no-restricted-globals */
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";

const { user } = isAuthenticated();
//const role = user.role;

const currentTab = (history, path) => {
  console.log(history);
  if (history.location.pathname === path) {
    return { color: "#FFFFFF", background: "#AE1438" };
  } else {
    return { color: "#2F363F" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-light">
      <li className="nav-item ">
        <Link style={currentTab(history, "/")} className="nav-link " to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
        </Link>
      </li>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            User-Dashboard
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            Admin-Dashboard
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              Sign-Up
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              Sign-In
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning pointer"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            SignOut
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
