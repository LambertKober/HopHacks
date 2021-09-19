import React from 'react'
import { Button,Modal } from 'react-bootstrap'
import {Link, withRouter} from "react-router-dom";
import axios from "axios";

// <Link class="nav-link" to="/calendar/CA/trey">

function BootstrapModalCA(props) {
    let base_url = "http://localhost:8000"
    let uuid = ""
    const form = document.getElementById("Form");

    const handleSubmit = (event) => {
        event.preventDefault()
        let name = event.target.elements.nameField.value;
        console.log(name)
        axios.post(base_url + "/cas", { "name": name })
            .then(res => {
                uuid = res.data.uuid;
            })
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

export default BootstrapModalCA;