import React, { useState } from "react";
import icon from './icon.svg';
import './navbar.css';
import BootstrapModal from "./student_login_modal.js";
import Popper from "popper.js";


function NavBar() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <html lang="en">
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
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Courses
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link "  href="#">FAQ</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#">Team</a>
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
                        <li class="nav-item" style={{'margin-right':'3px'}}>
                            <a class="nav-link " href="#"  onClick={() => setModalShow(true)}>
                                Log In
                            </a>
                            <BootstrapModal show={modalShow} onHide={() => setModalShow(false)}/>
                        </li>
                        <li class="nav-item px-2">
                            <button type="button" class="btn btn-outline-warning">Sign Up</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </html>
    );
}

export default NavBar;
