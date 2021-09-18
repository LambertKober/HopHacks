import React from 'react';
import './landing.css';
import { Container, Row, Col } from 'reactstrap';
import {Link, withRouter} from "react-router-dom";

function LandingApp(props) {
    return (
        <div class="container">
            <br/>
            <h1>Welcome to TicketOH!</h1>
            <br/>
            <br/>
            <Container>
                <Row>
                    <Col>
                        <Link class="nav-link" to="/calendar">
                            <button type="button" className="btn btn-primary button">
                                Click here if you are a student!
                            </button>
                        </Link>
                    </Col>
                    <Col>
                        <Link class="nav-link" to="/calendar">
                            <button type="button" className="btn btn-secondary button">
                                Click here if you are a CA!
                            </button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default withRouter(LandingApp);