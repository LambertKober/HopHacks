import React from 'react'
import { Button,Modal } from 'react-bootstrap'
import {Link, useHistory, withRouter} from "react-router-dom";
import axios from 'axios';

// <Link class="nav-link" to="/calendar/student/trey">


function BootstrapModalStudent(props) {
    let base_url = "http://localhost:8000"
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault()
        let name = event.target.elements.nameField.value;
        //console.log(name)
        axios.get(`${base_url}/sessions/`)
            .then(res => {/* set calendar component state here */})
            .then(() => axios.post(`${base_url}/students/`, { "name": name }))
            .then(res => history.push(`/calendar/student/${res.data.uuid}`))
    };

    return (
        <Modal{...props}>
            <div className="modal-header" id="modal-header">
                <h4 className="modal-title" id="modal-title">Login</h4>
                <button type="button" className="btn " onClick={() => props.onHide()}>✕</button>
            </div>
            <Modal.Body>
                <form id="Form" onSubmit={handleSubmit}>
                    <div>
                        <input name="nameField" className="form-control" placeholder="Username/Email"/>
                        <p className="form-text text-end">Enter Valid Username/Email</p>
                    </div>
                    <div className=" form-check w-100">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input"/> Remember Me
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 my-3 shadow">
                        Login
                    </button>
                    <a className= "m-0" href="#">Not yet registered</a>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onHide()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default withRouter(BootstrapModalStudent);