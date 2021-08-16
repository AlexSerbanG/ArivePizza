import React from 'react';
import { Switch, Route,  BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Cart } from './components/pages/Cart';
import { Menu } from './components/pages/Menu';
import { Account } from './components/pages/UserInfo';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/menu" component={Menu}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/account" component={Account}/>
        <Redirect to="/menu" />
      </Switch>
    </Router>
  );
}

export default App;
