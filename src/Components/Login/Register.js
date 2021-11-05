import React, {Component} from 'react';
import {Form, Button, Card, Row, Image, Container, InputGroup, Col, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import AuthenticationService from './AuthenticationService';
import AthenticationDataService from './AuthenticationDataService';
import {withRouter} from 'react-router-dom';
import Swal from "sweetalert2";

import logo from "../../Assets/Logo.png"
import {faBuilding, faEnvelope, faLock, faSearch, faTrashAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./Login.css"

import axios from "axios";

class Register extends Component {





    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userName:'',
            userRole:'',
            password: '',
            cpassword:'',
            hasLoginFailed: false,
            showSuccessMsg: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.registerClicked = this.registerClicked.bind(this);
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    componentDidMount() {
        this.getUserId()
    }

    getUserId = () => {
        axios.get('http://localhost:8080/user/userId')
            .then(response => {
                this.setState({
                    userId: response.data,
                })

            })

    }

    registerClicked(e) {
        e.preventDefault();
        if(this.state.password === this.state.cpassword) {
            const user = {
                userId: this.state.userId,
                userName: this.state.userName,
                userRole: this.state.userRole,
                password: this.state.password,
                cpassword: this.state.cpassword,
            }


            axios.post('http://localhost:8080/user/', user)
                .then(res => {
                    console.log(res.data)
                    if (res.status === 200) {

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            html: '<p>User added successfully!!</p>',
                            text:this.state.userId,
                            background: '#fff',
                            confirmButtonColor: '#1836d2',
                            iconColor: '#60e004'
                        })
                        Swal.fire({
                            icon: 'success',
                            title: 'Congratulations ' + this.state.userName+ ' !',
                            text:'Your User ID is '+ this.state.userId,
                            background: '#fff',
                            confirmButtonColor: '#1836d2',
                            iconColor: '#60e004'
                        })
                        // this.clearData();
                        this.props.history.push("/login")

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            html: '<p>There was an error adding User!!</p>',
                            background: '#fff',
                            confirmButtonColor: '#1836d2',
                            iconColor: '#e00404'
                        })
                    }
                });

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: '<p>Password does not match!!</p>',
                background: '#fff',
                confirmButtonColor: '#1836d2',
                iconColor: '#e00404'
            })
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
                                    <Nav.Link href="/login">Login</Nav.Link>

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

                <Card className={"crd-register"}>

                    <div className={"box-login"}>
                        <form onSubmit={this.registerClicked}>

                            <h3 className={"login-topic"}>Register</h3>

                            {/*<Form.Group controlId={"userId"} >*/}
                            {/*    <Form.Label>User ID</Form.Label>*/}

                            {/*    <Form.Control type={"text"}*/}
                            {/*                  name={"userId"}*/}
                            {/*                  placeholder={"User ID"}*/}
                            {/*                  required*/}
                            {/*                  value={this.state.userId}*/}
                            {/*                  onChange={this.handleChange}*/}
                            {/*                  className={"form-control-login"}/>*/}

                            {/*</Form.Group>*/}

                            <Form.Group controlId={"userName"} >
                                <Form.Label>User Name</Form.Label>

                                <Form.Control type={"text"}
                                              name={"userName"}
                                              placeholder={"User Name"}
                                              required
                                              value={this.state.userName}
                                              onChange={this.handleChange}
                                              className={"form-control-reg"}/>

                            </Form.Group>

                            <Form.Group controlId={"userRole"} >
                                <Form.Label>User Role</Form.Label>
                                <Form.Select value={this.state.userRole} name = {"userRole"} aria-label="Default select example" className={"form-control-reg"} onChange={this.handleChange}>
                                    <option >Choose a User Role</option>
                                    <option value="Management Staff">Management Staff</option>
                                    <option value="Site Manager">Site Manager</option>
                                    <option value="Delivery Manager">Delivery Manager</option>
                                    <option value="Accounting Staff">Accounting Staff</option>

                                </Form.Select>



                                {/*<Form.Control type={"text"}*/}
                                {/*              name={"userRole"}*/}
                                {/*              placeholder={"User ID"}*/}
                                {/*              required*/}
                                {/*              value={this.state.userRole}*/}
                                {/*              onChange={this.handleChange}*/}
                                {/*              className={"form-control-login"}/>*/}

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

                            <Form.Group controlId={"cpassword"} className={"mt-4"}>
                                <Form.Label>Password</Form.Label>

                                <Form.Control type={"password"}
                                              name={"cpassword"}
                                              placeholder={"Confirm Password"}
                                              required
                                              value={this.state.cpassword}
                                              onChange={this.handleChange}
                                              className={"form-control-reg"}/>

                            </Form.Group>

                            <div className={"text-center"}>
                                <Button name={"register"} type={"submit"}
                                        className={"signin-btn"}>Register</Button>
                            </div>



                        </form>
                    </div>
                </Card>



            </div>




        );
    }
}
export default withRouter(Register);