import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import UsersList from '../usersList';
import User from '../user';
import store from '../../store';

import './index.scss';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Route exact path="/" component={UsersList} />
        <Route exact path="/users/:login" component={User} />
      </div>
    </Router>
  </Provider>
);

export default App;
