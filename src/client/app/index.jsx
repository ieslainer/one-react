import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, browserHistory, Redirect} from 'react-router';

import {Home} from './home.jsx';
import {PerformanceList} from './performance-list.jsx';

class App extends React.Component {
  
  
  constructor() {
      super();
  }
  
  
  render () {          
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/summary/:id" component={Home}/>
        <Route path="performance-list/:assignmentRefId/:eventRefId" component={PerformanceList}/>  
        <Redirect from="*" to="/" />     
      </Router>
    );
  }
}

render(<App/>, document.getElementById('app'));
