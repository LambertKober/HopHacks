import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import icon from './icon.svg';
import './navbar.css';
import login_modal from './login_modal.js';
import BootstrapModal from "./login_modal.js";


function NavBar() {
  return (
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul class="navbar-nav me-auto">

          <li class="nav-item dropdown">
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
          <a class="navbar-brand mx-auto" href="#">OH.io</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ms-auto">
          <li class="nav-item">
                       {<BootstrapModal></BootstrapModal>}
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
