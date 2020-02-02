import React, { Component } from "react";
import styles from "./header.module.scss";

import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const logo = require("../../assets/images/logo.png");

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navExpanded: false,
      email: null
    };
  }

  componentDidMount() {
    this.setState({ navExpanded: false });
  }

  setNavExpanded = expanded => {
    this.setState({ navExpanded: expanded });
  };

  closeNav = () => {
    this.setState({ navExpanded: false });
  };

  render() {
    return (
      <div className={styles.navbarContainer}>
        <Navbar expand="lg" className={styles.navbar} collapseOnSelect={true}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <LinkContainer to="/">
            <Navbar.Brand className={styles.navbarBrand}>
              <img
                width="30"
                height="30"
                className="d-inline-block align-top"
                src={logo}
                alt={"CR"}
              />{" "}
              Creative Rotary Die Online
            </Navbar.Brand>
          </LinkContainer>

          {
            <Navbar.Collapse
              id="responsive-navbar-nav"
              onSelect={this.closeNav}
            >
              <Nav className="mr-auto">
                <LinkContainer to="/calculator">
                  <Nav.Link>Calculator</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/retooling">
                  <Nav.Link>Retooling</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/new">
                  <Nav.Link>New Quote</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/load">
                  <Nav.Link>Load Quote</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/preferences">
                  <Nav.Link>Preferences</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          }
        </Navbar>
      </div>
    );
  }
}

export default Header;
