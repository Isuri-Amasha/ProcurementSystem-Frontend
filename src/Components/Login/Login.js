import React, {Component} from 'react';
import {Form, Button, Card, Row, Image, Container, InputGroup, Col, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import AuthenticationService from './AuthenticationService';
import AthenticationDataService from './AuthenticationDataService';
import {withRouter} from 'react-router-dom';
import Swal from "sweetalert2";

import {faBuilding, faEnvelope, faLock, faSearch, faTrashAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./Login.css"

import logo from "../../Assets/Logo.png"

class Login extends Component {



    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userName:'',
            userRole:'',
            password: '',
            hasLoginFailed: false,
            showSuccessMsg: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    loginClicked() {
        if (this.state.userId === '' || this.state.password === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                background: '#fff',
                html: '<p>Fields Cannot be empty</p>',
                confirmButtonColor: '#1836d2',
                iconColor: '#cc1919'
            })
        } else {
            AthenticationDataService.getUser(this.state.userId)
                .then(
                    response => {
                        console.log(response.data)
                        if (response.data != null) {
                            if (this.state.password === response.data.password) {
                                AuthenticationService.successfulLogin(response.data.userId, response.data.userName, response.data.userRole)

                                    // if(response.data.userRole == "Management Staff"){
                                    //     this.props.history.push("/products")
                                    // }
                                    // if(response.data.userRole == "Accounting Staff"){
                                    //     this.props.history.push("/products")
                                    // }
                                 this.props.history.push("/products")
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error!',
                                    html: '<p>Error in login</p>',
                                    background: '#fff',
                                    iconColor: '#e00404',
                                    confirmButtonColor: '#1836d2'
                                })
                            }
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error!',
                                html: '<p>Wrong userId or password</p>',
                                background: '#fff',
                                iconColor: '#e00404',
                                confirmButtonColor: '#1836d2'
                            })
                        }
                    }
                )
        }

    }

    render() {
        return (


            <div className={"background"}>
                <div>
                    <Navbar expand="lg" className={"nav-main"}>
                        <Container>
                            <Image className={"logo-img"} width={"100px"} src={logo}></Image>
                            <Navbar.Brand href="#home" className={"topic"}>Procurement System</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/">Home</Nav.Link>


                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

            <Card className={"crd-login"}>

                <div className={"box-login"}>
            <form>

                <h3 className={"login-topic"}>Log in</h3>

                <Form.Group controlId={"userId"} >
                    <Form.Label>User ID</Form.Label>

                        <Form.Control type={"text"}
                                      name={"userId"}
                                      placeholder={"User ID"}
                                      required
                                      value={this.state.userId}
                                      onChange={this.handleChange}
                                      className={"form-control-reg"}/>

                </Form.Group>

                <Form.Group controlId={"password"} className={"mt-4"}>
                    <Form.Label>Password</Form.Label>

                        <Form.Control type={"password"}
                                      name={"password"}
                                      placeholder={"Password"}
                                      required
                                      value={this.state.password}
                                      onChange={this.handleChange}
                                      className={"form-control-reg"}/>

                </Form.Group>

                <div className={"text-center"}>
                    <Button name={"signup"} onClick={this.loginClicked}
                            className={"signin-btn"}>Login</Button>
                </div>

                <div  className={"register-link-div"}><a href="/register" className={"register-link"}>Register from here</a></div>


            </form>
                </div>
            </Card>



</div>




        );
    }
}
export default withRouter(Login);