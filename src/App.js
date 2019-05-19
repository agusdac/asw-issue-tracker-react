import React from 'react';
import IssueIndex from './components/IssueIndex';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Issue from './components/pages/Issue';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={props => (
          <React.Fragment>
            <IssueIndex/>
          </React.Fragment>
        )}/>
        <Route path="/issue/:id" component={Issue} />
      </div>
    </Router>
  );
}

export default App;
