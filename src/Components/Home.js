import React, {Component} from "react";
import {
    Card,
    CardGroup,
    CloseButton,
    Col,
    Container,
    Form,
    Image,
    Modal,
    Nav,
    Navbar,
    NavDropdown,
    Row
} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import "../Stylesheets/Home.css";

import studyImg from "../Assets/elearning.png";
import mailBoxImg from "../Assets/Mailbox-bro.png";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import AuthenticationService from "./Login/AuthenticationService";
//import emailjs from "emailjs-com";
import Building from "../Assets/Building 01.jpg"
import Building2 from "../Assets/Building2.png"
import Building3 from "../Assets/Building3.png"
import Building4 from "../Assets/Building4.png"
import logo from "../Assets/Logo.png"



class Home extends  Component{

    login = () => {
        // AuthenticationService.logout();
        this.props.history.push("/login")
    }

    render() {
        return (
<div className={"background"}>
            <Navbar expand="lg" className={"nav-main"}>
                <Container>
                    <Image className={"logo-img"} width={"100px"} src={logo}></Image>
                    <Navbar.Brand href="#home" className={"topic"}>Procurement System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className={"topic-link"}>Home</Nav.Link>


                        </Nav>
                        <Nav>
                            <Nav.Link ><button className={"btn-logout"} onClick={this.login}>Log In</button></Nav.Link>


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

    <CardGroup className={"dec-crd-grp"}>
        <Card className={"dec-crd"}>
            <Card.Img variant="top" src={Building2} />
            <Card.Body>
                <Card.Title className={"dec-crd-title"}>Products</Card.Title>
                <Card.Text className={"dec-crd-txt"}>
                    Expose customers to a wide variety of products allowing to experience a greater service.
                </Card.Text>
            </Card.Body>

        </Card>
        <Card className={"dec-crd"}>
            <Card.Img variant="top" src={Building3} />
            <Card.Body>
                <Card.Title className={"dec-crd-title"}>Orders</Card.Title>
                <Card.Text className={"dec-crd-txt"}>
                   Introducing the easiest and safest ways to order products to the doorsteps, making everything much more meaningful.
                </Card.Text>
            </Card.Body>

        </Card>
        <Card className={"dec-crd"}>
            <Card.Img variant="top" src={Building4} />
            <Card.Body>
                <Card.Title className={"dec-crd-title"}>Payment</Card.Title>
                <Card.Text className={"dec-crd-txt"}>
                    Using most safest and effective methods in payment, ensuring customers safety and happiness.
                </Card.Text>
            </Card.Body>

        </Card>
    </CardGroup>

</div>

            )




    }
}
export default Home;