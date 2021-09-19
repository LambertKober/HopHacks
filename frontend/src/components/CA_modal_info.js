import React from 'react'
import { Button,Modal } from 'react-bootstrap'

class CAModalInfo extends React.Component{
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
                <button type="button" className="btn btn-primary m-4" style={{'width':'40%'}}onClick={() => this.handleModalShowHide()} >
                    Submit Availability
                </button>


                <Modal show={this.state.showHide}>
                    <div className="modal-header" id="modal-header">
                        <h4 className="modal-title" id="modal-title">
                            Availability Recorded.
                        </h4>
                        <button type="button" className="btn " onClick={() => this.handleModalShowHide()}>✕</button>
                    </div>

                    <Modal.Body>
                        <form>
                            <p class=" m-0">Thank you! <br></br> Your office hours have been recorded. </p>
                        </form>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                            Close
                        </Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}

export default CAModalInfo;
