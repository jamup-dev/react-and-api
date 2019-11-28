import React, { useCallback, useState } from "react";
import axios from "axios";
import { endpoint } from "../../utils/endpoint";
import { useSessionDispatch } from "../../utils/auth";

export default function Signin({ history }) {
  const [loading, setLoading] = useState(false);
  const sessionDispatch = useSessionDispatch();

  const loginHandler = useCallback(
    e => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;

      // some basic validation
      if (username === "") {
        alert("Username can not be empty");
        return;
      }
      if (password === "") {
        alert("Password can not be empty");
        return;
      }

      setLoading(true);
      axios
        .post(`${endpoint}/login/`, {
          username,
          password
        })
        .then(response => {
          // API server is programmed to give status 200 only when logged in
          // so the promise would resolve only when user has correct username
          // and password
          sessionDispatch({
            type: "LOGIN",
            payload: {
              token: response.data.token,
              user: response.data.user
            }
          });
          history.push("/");
        })
        .catch(e => {
          // could be due to network error or authentication error
          console.log(e.response);
          // it is authentication error if we have response.data and
          // response.data.success === false
          if (e.response.data && e.response.data.success === false) {
            alert(e.response.data.message);
          } else {
            alert(e);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [sessionDispatch, history]
  );

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#fff"
      }}
    >
      <h2 className="title">Login to access songs</h2>
      <form onSubmit={loginHandler}>
        <div className="field">
          <label htmlFor="username" className="label">
            Username
          </label>
          <p className="control">
            <input
              id="username"
              name="username"
              className="input"
              type="text"
              placeholder="Username"
            />
          </p>
        </div>
        <div className="field">
          <label htmlFor="password" className="label">
            Password
          </label>
          <p className="control">
            <input
              id="password"
              name="password"
              className="input"
              type="password"
              placeholder="Password"
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button
              type="submit"
              disabled={loading}
              className={`button is-success ${loading ? "is-loading" : ""}`}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
