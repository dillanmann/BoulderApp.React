import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import { createBrowserHistory } from 'history';

import Home from './Home';
import CenterDetails from './CenterDetails';
import CircuitDetails from './CircuitDetails';
import ProblemDetails from './ProblemDetails';
import { FaGithub } from 'react-icons/fa';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Navbar bg='dark' variant='dark'>
        <Container>
            <Col xs={6}>
              <Navbar.Brand href='/'>
              BoulderApp Admin UI
              </Navbar.Brand>
            </Col>
            <Col xs={{ span: 2, offset: 4 }}>
              <Button href='https://github.com/dillanmann/BoulderApp.React'>
                <FaGithub />
              </Button>
            </Col>
          </Container>
        </Navbar>
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