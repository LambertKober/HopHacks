import React from 'react';
import './landing.css';
import {Container, Row, Col} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import BootstrapModalStudent from "./student_login_modal.js";
import BootstrapModalCA from "./CA_login_modal.js";


function Landing(props) {
    const [modalShowStudent, setShowStudent] = React.useState(false);
    const [modalShowCA, setShowCA] = React.useState(false);


    return (
        <div class="container">
            <Container style={{'width':'110%', 'margin-top':'9%'}}>
                <Row>
                    <Col>
                        <button type="button" className="btn btn-primary button" style={{'width':'95%'}} onClick={() => setShowStudent(true)}>
                            Student
                        </button>
                        <BootstrapModalStudent show={modalShowStudent} onHide={() => setShowStudent(false)}/>
                    </Col>
                    <Col>
                        <button type="button" className="btn btn-secondary button" style={{'width':'95%'}} onClick={() => setShowCA(true)}>
                            CA
                        </button>
                        <BootstrapModalCA show={modalShowCA} onHide={() => setShowCA(false) }/>
                    </Col>
                </Row>
                <div style={{'padding-bottom':'15.5%'}}></div>
            </Container>
        </div>
    )
}

export default withRouter(Landing);
