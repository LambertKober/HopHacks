import React from 'react';
import './landing.css';
import {Container, Row, Col} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import BootstrapModal from "./login_modal.js";


function Landing(props) {
    const [modalShow, setShow] = React.useState(false);

    return (
        <div class="container">
            <Container>
                <br/>
                <h1>Welcome to TicketOH!</h1>
                <br/>
                <Row>
                    <Col>
                        <button type="button" className="btn btn-primary button" onClick={() => setShow(true)}>
                            <h2>Click here if you are a student!</h2>
                        </button>
                        <BootstrapModal show={modalShow} onHide={() => setShow(false)}/>
                    </Col>
                    <Col>
                        <button type="button" className="btn btn-secondary button" onClick={() => setShow(true)}>
                            <h2>Click here if you are a CA!</h2>
                        </button>
                        <BootstrapModal show={modalShow} onHide={() => setShow(false) }/>
                    </Col>
                </Row>
                <div style={{'padding-bottom':'17%'}}></div>
            </Container>
        </div>
    )
}

export default withRouter(Landing);
