import React from 'react';
import IssueIndex from './components/IssueIndex';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Issue from './components/pages/Issue';
import CreateIssue from './components/pages/CreateIssue'
import EditIssue from './components/pages/EditIssue'
import cors from 'cors'

function App() {
    require('cors')
    cors()
    
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={props => (
          <React.Fragment>
            <IssueIndex/>
          </React.Fragment>
        )}/>
        <Route path="/issue/:id" component={Issue} />
        <Route path="/issues/new" component={CreateIssue} />
        <Route path="/issue/:id/edit" component={EditIssue} />
      </div>
    </Router>
  );
}

export default App;
