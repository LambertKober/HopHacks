import React from 'react';
import './landing.css';
import { Container, Row, Col } from 'reactstrap';
import {Link, withRouter} from "react-router-dom";

function LandingApp(props) {
    return (
        <div class="container">
            <br/>
            <h1 style={{display: "inline"}}>Welcome to&nbsp;</h1><nobr/><h1 style={{color: "#edcb21 ", display: "inline"}}>TicketOH!</h1>
            <br/>
            <br/>
            <Container>
                <Row>
                    <Col>
                        <Link class="nav-link" to="/calendar">
                            <button type="button" className="btn btn-primary button">
                                <h2>Click here if you are a student!</h2>
                            </button>
                        </Link>
                    </Col>
                    <Col>
                        <Link class="nav-link" to="/calendar">
                            <button type="button" className="btn btn-secondary button">
                                <h2>Click here if you are a CA!</h2>
                            </button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default withRouter(LandingApp);