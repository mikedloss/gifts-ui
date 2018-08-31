import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Home from './containers/Home';
// import Survey from './containers/Survey';
// import Results from './containers/Results';
// import History from './containers/History';

import './index.css';

const AsyncSurvey = importedComponent(
  () => import(/* webpackChunkName: 'Survey' */ './containers/Survey'),
  { LoadingComponent: Loading }
)

const AsyncHistory = importedComponent(
  () => import(/* webpackChunkName: 'History' */ './containers/History'),
  { LoadingComponent: Loading }
)

const AsyncResults = importedComponent(
  () => import(/* webpackChunkName: 'Results' */ './containers/Results'),
  { LoadingComponent: Loading }
)

ReactDOM.render(
  <BrowserRouter>
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/survey' component={AsyncSurvey} />
        <Route path='/loading' component={Loading} />
        <Route path='/results/history/:email' component={AsyncHistory} />
        <Route exact path='/results/:uuid' component={AsyncResults} />
      </Switch>
      <Footer />
    </div> 
  </BrowserRouter>,
  document.getElementById('root')
)
