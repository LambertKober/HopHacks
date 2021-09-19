import React, { useState } from 'react';
import './landing.css';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import {Link, withRouter} from "react-router-dom";
import BootstrapModal from "./login.js";

function Landing(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div class="container">
            <Container>
                <br/>
                <h1>Welcome to TicketOH!</h1>
                <br/>
                <Row>
                    <Col>
                        <button type="button" className="btn btn-primary button" onClick={handleShow}>
                            <h2>Click here if you are a student!</h2>
                        </button>
                    </Col>
                    <Col>
                        <button type="button" className="btn btn-secondary button">
                            <h2>Click here if you are a CA!</h2>
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default withRouter(Landing);