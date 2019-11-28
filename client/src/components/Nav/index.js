import React from "react";
import { Link } from "react-router-dom";

import { useSession, useSessionDispatch } from "../../utils/auth";

export default function Nav() {
  const session = useSession();
  const sessionDispatch = useSessionDispatch();

  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand" style={{ width: "100%" }}>
          <Link className="navbar-item" to="/">
            <strong>API APP</strong>
          </Link>
          <div className="navbar-end" style={{ marginLeft: "auto" }}>
            <div className="navbar-item">
              {session.isAuthenticated ? (
                <>
                  <div className="navbar-item">{`Welcome ${session.user.firstName}`}</div>
                  <button
                    className="button is-light"
                    onClick={e => {
                      e.preventDefault();
                      sessionDispatch({ type: "LOGOUT" });
                    }}
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <Link className="button is-primary" to="/signin">
                  LOGIN
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
