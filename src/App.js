import React, { Component } from 'react';
import { BrowserRouter as Router, Link , Switch, Route } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import { createBrowserHistory } from 'history';

import Home from './Home';
import CenterDetails from './CenterDetails';
import CircuitDetails from './CircuitDetails';
import ProblemDetails from './ProblemDetails';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
    <ApolloProvider client={client}>
      <Router history={history}>
      <Nav>
        <Nav.Item>
          <Link to="/">Home</Link>
        </Nav.Item>
      </Nav>
      <Switch>
        
        <Route path="/" exact children={x => <Home history={x.history}/>} />          
        <Route path="/center/:id" children={x => <CenterDetails history={x.history} id={x.match.params.id} />}/>
        <Route path="/circuit/:id" children={x => <CircuitDetails history={x.history} id={x.match.params.id} />}/>
        <Route path="/problem/:id" children={x => <ProblemDetails history={x.history} id={x.match.params.id} />}/>
      </Switch>
      </Router>
      </ApolloProvider>
    );
  }
}

export default App;