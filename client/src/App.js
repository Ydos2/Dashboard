import React from "react";
import queryString from 'query-string';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
//import { render } from "react-dom";
//import { BrowserRouter } from "react-router-dom";
import './App.css';
import Routes from "./Routes";

const crypto = require('crypto');

const ytbLogUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=213049852255-7lr2e9v67g3ahhon6i072l2a2o4shgtj.apps.googleusercontent.com&redirect_uri=https://localhost:3000/&response_type=token&scope=https://www.googleapis.com/auth/youtube&state=";

function loginYtb() {
    var state = crypto.randomBytes(20).toString('hex');
    var currUrl = ytbLogUrl + state;
    window.open(currUrl);
  }

function App() {
  const [data, setData] = React.useState(null);
  const token = null;

  console.log('token ', !token ? "null" : token);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Dashboard
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="/signup">
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
      {/*<button onClick={loginYtb}>Login to youtube</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
  </header>*/}
    </div>
  );
}

export default App;
