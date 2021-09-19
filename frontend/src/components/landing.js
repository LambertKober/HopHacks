import React, {useState} from 'react';
import './landing.css';
import {Container, Row, Col} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import BootstrapModalStudent from "./login_modal_student.js";
import BootstrapModalCA from "./login_modal_CA.js";


function Landing(props) {
    const [modalShowStudent, setShowStudent] = React.useState(false);
    const [modalShowCA, setShowCA] = React.useState(false);

    return (
        <div class="container">
            <Container>
                <br/>
                <h1>Welcome to TicketOH!</h1>
                <br/>
                <Row>
                    <Col>
                        <button type="button" className="btn btn-primary button" onClick={() => setShowStudent(true)}>
                            <h2>Click here if you are a student!</h2>
                        </button>
                        <BootstrapModalStudent show={modalShowStudent} onHide={() => setShowStudent(false)}/>
                    </Col>
                    <Col>
                        <button type="button" className="btn btn-secondary button" onClick={() => setShowCA(true)}>
                            <h2>Click here if you are a CA!</h2>
                        </button>
                        <BootstrapModalCA show={modalShowCA} onHide={() => setShowCA(false) }/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default withRouter(Landing);