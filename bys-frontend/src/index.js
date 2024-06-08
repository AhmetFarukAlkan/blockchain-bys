import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';
import './Assets/Scss/App.scss';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Routes from './App';
import {store} from './redux/store';

ReactDOM.render(<Provider store={store}>
  <Router>
    <Switch>
      <Routes/>
    </Switch>
  </Router>
</Provider>,
document.getElementById('root'));
