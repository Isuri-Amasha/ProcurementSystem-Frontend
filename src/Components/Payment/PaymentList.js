import React, {Component} from "react";
import axios from "axios";
import {Badge, Button, ButtonGroup, Card, Col, Container, Nav, Navbar, Row, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import './Payment.css';
import AuthenticationService from "../Login/AuthenticationService";
import Navbar1 from '../Navbar1'
import {alignPropType} from "react-bootstrap/types";

class PaymentList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            order: '',
            orderId: '',
            payments: []
        }
    }

    componentDidMount() {
        this.getPaymentList();
    }

    getPaymentList = () =>{
        axios.get('http://localhost:8080/payment/')
            .then(response => {
                this.setState({payments: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    logout = () => {
        AuthenticationService.logout();
        this.props.history.push("/")
    }

    render() {
        const {payments} = this.state;
        return (

            <div className={"background"}>
                <div>
                    {/*<Navbar expand="lg" className={"nav-main"}>*/}
                    {/*    <Container>*/}
                    {/*        <Navbar.Brand href="#home" className={"topic"}>Procurement System</Navbar.Brand>*/}
                    {/*        <Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
                    {/*        <Navbar.Collapse id="basic-navbar-nav">*/}
                    {/*            <Nav className="me-auto">*/}
                    {/*                /!*<Nav.Link href="/">Home</Nav.Link>*!/*/}
                    {/*                <Nav.Link href="/products" className={"topic-link"}>Products</Nav.Link>*/}
                    {/*                <Nav.Link href="/orders" className={"topic-link"}>Orders</Nav.Link>*/}
                    {/*                <Nav.Link href="/payments" className={"topic-link"}>Payments</Nav.Link>*/}
                    {/*            </Nav>*/}
                    {/*            <Nav>*/}
                    {/*                <Nav.Link ><button className={"btn-logout"} onClick={this.logout}>Log Out</button></Nav.Link>*/}


                    {/*            </Nav>*/}
                    {/*        </Navbar.Collapse>*/}
                    {/*    </Container>*/}
                    {/*</Navbar>*/}
                    <Navbar1/>

                    {/*<Navbar1/>*/}
                </div>
                <Card className={"crd-product-tb"}>
                    <Card.Body>
                        <Card.Title className={"crd-product-title"}>
                            Payment List
                        </Card.Title>

                        <div className={"main-div"}>


                <Table striped responsive hover bordered className={"product-table"}>
                    <thead>
                    <tr>
                        <th className={"text-center"}>Payment ID</th>
                        <th className={"text-center"}>Order ID</th>
                        <th className={"text-center"}>Vendor ID</th>
                        <th className={"text-center"}>Vendor Name</th>
                        <th className={"text-center"}>Date</th>
                        <th className={"text-center"}>Total Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        payments.length === 0 ?
                            <tr align={"center"}>
                                <td colSpan={"5"}>No records at the moment</td>
                            </tr>

                            : [
                                payments.map (payment =>
                                    <tr key={payment.paymentId}>
                                        <td style={{verticalAlign: 'middle'}}>{payment.paymentId}</td>
                                        <td style={{verticalAlign: 'middle'}}>{payment.orderId}</td>
                                        <td style={{verticalAlign: 'middle'}}>{payment.vendorId}</td>
                                        <td style={{verticalAlign: 'middle'}}><Badge bg={"success"} className={"user-badge"}>{payment.vendorName}</Badge></td>
                                        <td style={{verticalAlign: 'middle'}}>{payment.date}</td>
                                        <td style={{verticalAlign: 'middle'}}>Rs.{payment.totalAmount}</td>

                                    </tr>
                                )
                            ]
                    }
                    </tbody>
                </Table>

                        </div>
                    </Card.Body>
                </Card>

                {/*--------------------------Model Box to Edit Conference--------------------------*/}

                {/*<Modal show={this.state.show} onHide={this.handleClose} centered>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title>Update</Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body> <UpdateConferenceDetailsComponent conferenceId={this.state.conferenceId}/>*/}
                {/*    </Modal.Body>*/}
                {/*</Modal>*/}

                {/*--------------------------------------------------------------------------------*/}


            </div>
        )
    }
}

export default PaymentList;
