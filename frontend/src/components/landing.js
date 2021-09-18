import React from 'react';
import './landing.css';
import { Container, Row, Col } from 'reactstrap';

class LandingApp extends React.Component {
    render() {
        return (
            <div class="container">
                <br/>
                <h1>Welcome to TicketOH!</h1>
                <br/>
                <br/>
                <Container>
                    <Row>
                        <Col>
                            <button type="button" className="btn btn-primary button">
                                Click here if you are a student!
                            </button>
                        </Col>
                        <Col>
                            <button type="button" className="btn btn-secondary button">
                                Click here if you are a CA!
                            </button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default LandingApp;