import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { SessionProvider } from "./utils/auth";
import Nav from "./components/Nav";
import Home from "./routes/Home";
import Signin from "./routes/Signin";

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <header>
          <Nav />
        </header>
        <main>
          <section className="section">
            <div className="container">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route render={() => <h2>The Page can not be found: 404</h2>} />
              </Switch>
            </div>
          </section>
        </main>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
