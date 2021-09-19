import React from 'react'
import { Button,Modal } from 'react-bootstrap'
import {Link} from "react-router-dom";

function BootstrapModalCA(props) {
    const handleSubmit = () => {
        console.log("NAME SUBMISSION HERE");
    };

    return (
        <Modal{...props}>
            <div className="modal-header" id="modal-header" >
                <h4 className="modal-title" id="modal-title">Login</h4>
                <button type="button" className="btn " onClick={() => props.onHide()}>✕</button>
            </div>
            <Modal.Body>
                <form>
                    <div>
                        <input className="form-control" placeholder="Username/Email"/>
                        <p className="form-text text-end">Enter Valid Username/Email</p>
                    </div>
                    <div className=" form-check w-100">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input"/> Remember Me
                        </label>
                    </div>
                    <Link class="nav-link" to="/calendar_ca">
                        <a button type="submit" className="btn btn-primary w-100 my-3 shadow" onClick={handleSubmit()}>
                            Login
                        </a>
                    </Link>
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


