import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { Cart } from "./components/pages/Cart";
import { Menu } from "./components/pages/Menu";
import { Account } from "./components/pages/Account";
import { UserContextProvider } from "./_context/UserContext";
import { CartContextProvider } from "./_context/CartContext";

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <Router>
          <Switch>
            <Route path="/menu" component={Menu} />
            <Route path="/cart" component={Cart} />
            <Route path="/account" component={Account} />
            <Redirect to="/menu" />
          </Switch>
        </Router>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
