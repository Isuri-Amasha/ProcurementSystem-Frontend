import React, {Component} from "react";
import {CloseButton, Col, Container, Form, Image, Modal, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import "../Stylesheets/Home.css";
// import logo from "../Assets/elms-logo-black.svg"
import studyImg from "../Assets/elearning.png";
import mailBoxImg from "../Assets/Mailbox-bro.png";
import {Link, withRouter} from "react-router-dom";
import Swal from "sweetalert2";
import AuthenticationService from "./Login/AuthenticationService";
//import emailjs from "emailjs-com";
import logo from "../Assets/Logo.png"



class Navbar1 extends  Component{

    constructor(props) {
        super(props);

        this.state = {
            id:'',
            show: false,
            display:false,
            products: [],
            userRole: AuthenticationService.loggedUserRole(),
            isUserLoggedIn: AuthenticationService.isUserLoggedIn(),
            loggedInUsername: AuthenticationService.loggedUserName(),
            vendorId:AuthenticationService.loggedUserId()
        }
    }

    logout = () => {
        AuthenticationService.logout();
        this.props.history.push("/")
    }

    orderHistory = () =>{
        AuthenticationService.loggedUserId();
        this.props.history.push(`/orderHistory/${this.state.loggedUserId()}`);
    }


    render() {
        const {
            isUserLoggedIn,
            loggedInUsername,
            loadContent,
            vendorId
        } = this.state

        const loggedUserRole = AuthenticationService.loggedUserRole();
        let loggedAsManagementStaff = false;
        let loggedAsAccountingStaff = false;
        let loggedAsSiteManager = false;
        let loggedAsDeliveryManager = false;

        if (loggedUserRole != null && loggedUserRole === 'Management Staff') {
            loggedAsManagementStaff = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'Accounting Staff') {
            loggedAsAccountingStaff = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'Site Manager') {
            loggedAsSiteManager = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'Delivery Manager') {
            loggedAsDeliveryManager = true;
        }
        return (


                <Navbar expand="lg" className={"nav-main"}>



                    {isUserLoggedIn &&
                    <Container>
                        <Image className={"logo-img"} width={"100px"} src={logo}></Image>
                        <Navbar.Brand href="#home" className={"topic"}>Procurement System</Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">


                            <Nav className="me-auto">
                                <Nav.Link href="/products" className={"topic-link"}>Products</Nav.Link>
                                {loggedAsSiteManager &&
                                <Nav.Link href="/orderHistory" className={"topic-link"}>Order History</Nav.Link>
                                }
                                {!loggedAsSiteManager &&
                                <Nav.Link href="/orders" className={"topic-link"}>Orders</Nav.Link>}
                                {!loggedAsSiteManager &&
                                <Nav.Link href="/paymentList" className={"topic-link"}>Payment</Nav.Link>
                                }
                            </Nav>

                            <Nav>
                                <Nav.Link className={"dp-name"}>Hii {this.state.loggedInUsername}</Nav.Link>
                                <Nav.Link>
                                    <button className={"btn-logout"} onClick={this.logout}>Log Out</button>
                                </Nav.Link>

                            </Nav>


                        </Navbar.Collapse>

                    </Container>
                    }

                </Navbar>



        )




    }
}
export default withRouter(Navbar1);