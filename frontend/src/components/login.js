import React from 'react'
import { Button, Modal } from 'react-bootstrap'

class BootstrapModal extends React.Component{

    constructor(){
        super();
        this.state = {
            showHide : false
        }
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    render(){
        return(
            <div>
                <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                    Log In
                </Button>

                <Modal show={this.state.showHide}>
                    <div className="modal-header" id="modal-header">
                        <h4 className="modal-title" id="modal-title">
                            Modal Heading
                        </h4>
                        <button type="button" className="btn " onClick={() => this.handleModalShowHide()}>✕</button>
                    </div>

                    <Modal.Body>
                        <form>
                            <div class="">
                                <input type="email" class="form-control" placeholder="Username/Email"/>
                                <p class="form-text text-end">Enter Valid Username/Email</p>
                            </div>
                            <div class=" form-check w-100">
                                <label class="form-check-label">
                                    <input type="checkbox" class="form-check-input"/> Remember Me
                                </label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100 my-3 shadow">Login</button>
                            <p class=" m-0">Not yet registered, <a href="#">Please Signup</a></p>
                        </form>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}

export default BootstrapModal;