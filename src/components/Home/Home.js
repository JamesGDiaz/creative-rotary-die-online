import React, { Component } from "react";
import styles from "./home.module.scss";
import { Container, Row } from "react-bootstrap";

const Logo = require("../../assets/images/CreativeRotary.png");

class Home extends Component {
  render() {
    return (
      <Container>
        <Row className={styles.home}>
          <p>
            <strong>Welcome!</strong>
          </p>
          <img class="img img-fluid" src={Logo} alt={"Creative Rotary Die"} />
        </Row>
      </Container>
    );
  }
}

export default Home;
