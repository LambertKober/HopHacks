import React, { useState } from "react";
import icon from './icon.svg';
import './navbar.css';
import BootstrapModal from "./login_modal.js";
import {Button} from 'react-bootstrap';

function NavBar() {

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <div class="container-fluid">
                <div class="navbar-collapse collapse w-100 order-md-0 ">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="navbar-brand" href="#">
                                <img src={(icon)} width="30" height="30" class="icon"/>
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link active dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Courses
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#">FAQ</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Team</a>
                        </li>
                    </ul>
                </div>
                <div class="mx-auto order-0">
                    <a class="navbar-brand mx-auto" href="#">
                        timely.ca
                    </a>
                </div>
                <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <Button a class="nav-link active"  onClick={() => setModalShow(true)}>
                                Log In
                            </Button>
                            <BootstrapModal show={modalShow} onHide={() => setModalShow(false)}/>
                        </li>
                        <li class="nav-item px-2">
                            <button type="button" class="btn btn-outline-warning">Sign Up</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
