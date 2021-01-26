# gas-react-router

Router for gas-react

## Usage

App.js
~~~javascript
import React from 'react';
import { Router } from 'gas-react-router';

import './App.css';

import NavBar from './NavBar';
import Routes from './Routes';

const App = () => (
  <div className="App">
    <Router>
      <NavBar />
      <Routes />
    </Router>
  </div>
);

export default App;

~~~

NavBar.js
~~~javascript
import React from 'react';
import { useRouter } from 'gas-react-router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavBar() {
  const { setPage, page } = useRouter();
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">gas-react</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link active={!page} href="#home" onClick={() => { setPage(''); }}>Home</Nav.Link>
        <Nav.Link active={page === 'about'} href="#about" onClick={() => { setPage('about'); }}>About</Nav.Link>
        <Nav.Link active={page === 'api'} href="#api" onClick={() => { setPage('api'); }}>API</Nav.Link>
        <Nav.Link active={page === 'router'} href="#router" onClick={() => { setPage('router'); }}>Router</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;

~~~

Routes.js
~~~javascript
import React from 'react';
import { Page } from 'gas-react-router';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import API from './routes/API';
import Home from './routes/Home';
import About from './routes/About';
import AboutRouter from './routes/AboutRouter';

const Routes = () => (
  <Container>
    <Row>
      <Col>
        <Page><Home /></Page>
        <Page page="api"><API /></Page>
        <Page page="about"><About /></Page>
        <Page page="router"><AboutRouter /></Page>
      </Col>
    </Row>
  </Container>
);

export default Routes;

~~~