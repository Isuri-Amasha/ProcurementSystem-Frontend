import {Component} from "react/cjs/react.production.min";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faExternalLinkAlt,
     faMoneyBillWaveAlt,
    faTrashAlt, faTruck
} from "@fortawesome/free-solid-svg-icons";
import {Badge, Button, ButtonGroup, Card, Container, Modal, Nav, Navbar, NavDropdown, Table} from "react-bootstrap";
import './Order.css';
import '../../Stylesheets/Home.css'
import React from "react";
import AuthenticationService from "../Login/AuthenticationService";
import Swal from "sweetalert2";
import Navbar1 from '../Navbar1'

import Items from "./Items";

class OrderHistory extends Component{

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            userRole: AuthenticationService.loggedUserRole(),
            show: '',
            orderId:'',
            vendorId:AuthenticationService.loggedUserId()
        }
    }

    componentDidMount(){
        this.refreshTable();
    }


    refreshTable = () =>{
        axios.get(`http://localhost:8080/order/getByUserId/${this.state.vendorId}`)
            .then(response => {
                this.setState({orders: response.data})
                console.log(response.data)
                console.log(this.state.vendorId)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    pendingOrders = () =>{
        axios.get(`http://localhost:8080/order/pendingOrdersByUserId/${this.state.vendorId}`)
            .then(response => {
                this.setState({orders: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    approvedOrders = () =>{
        axios.get(`http://localhost:8080/order/approvedOrdersByUserId/${this.state.vendorId}`)
            .then(response => {
                this.setState({orders: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    automaticallyApprovedOrders = () =>{
        axios.get(`http://localhost:8080/order/automaticallyApprovedOrdersByUserId/${this.state.vendorId}`)
            .then(response => {
                this.setState({orders: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    rejectedOrders = () =>{
        axios.get(`http://localhost:8080/order/rejectedOrdersByUserId/${this.state.vendorId}`)
            .then(response => {
                this.setState({orders: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    inProgressdOrders = () =>{
        axios.get(`http://localhost:8080/order/inProgressOrdersByUserId/${this.state.vendorId}`)
            .then(response => {
                this.setState({orders: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deliveredOrders = () =>{
        axios.get(`http://localhost:8080/order/deliveredOrdersByUserId/${this.state.vendorId}`)
            .then(response => {
                this.setState({orders: response.data})
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

    showItems (orderId){
        this.setState({
            orderId: orderId,
            show: true
        })
    }

    closeItems = () => {
        this.setState({
            show: false
        })
    }

    render() {
        const {orders} = this.state;
        return (
            <div>
                <div className={"background"}>
                    <div>
                        {/*<Navbar expand="lg" className={"nav-main"}>*/}
                        {/*    <Container>*/}
                        {/*        <Navbar.Brand href="#home" className={"topic"}>Procurement System</Navbar.Brand>*/}
                        {/*        <Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
                        {/*        <Navbar.Collapse id="basic-navbar-nav">*/}
                        {/*            {this.state.userRole === "Site Manager" &&*/}
                        {/*            <Nav className="me-auto">*/}
                        {/*                /!*<Nav.Link href="/">Home</Nav.Link>*!/*/}
                        {/*                <Nav.Link href="/products" className={"topic-link"}>Products</Nav.Link>*/}
                        {/*                */}
                        {/*            </Nav>}*/}
                        {/*            {this.state.userRole === "Site Manager" &&*/}
                        {/*            <Nav>*/}
                        {/*                <Nav.Link ><button className={"btn-logout"} onClick={this.logout}>Log Out</button></Nav.Link>*/}


                        {/*            </Nav>*/}
                        {/*            }*/}
                        {/*        </Navbar.Collapse>*/}
                        {/*    </Container>*/}
                        {/*</Navbar>*/}
                        <Navbar1/>

                    </div>
                    <Card className={"crd-order-tb"}>
                        <Card.Body>
                            <Card.Title className={"crd-order-title"}>Orders History</Card.Title>
                            <div className={"main-div"}>

                                <div>
                                    <center>
                                        <ButtonGroup className={"order-btn-group-mn"}>
                                            <Button variant={"outline-primary"} type={"submit"} className={"btn-status"}
                                                    onClick={this.refreshTable}>ALL ORDERS</Button>
                                            <Button variant={"outline-success"} type={"submit"} className={"btn-status"}
                                                    onClick={() => this.pendingOrders()}>PENDING</Button>
                                            <Button variant={"outline-warning"} type={"submit"} className={"btn-status"}
                                                    onClick={() => this.inProgressdOrders()}>IN PROGRESS</Button>
                                            <Button variant={"outline-secondary"} type={"submit"} className={"btn-status"}
                                                    onClick={() => this.deliveredOrders()}>DELIVERED</Button>
                                            <Button variant={"outline-danger"} type={"submit"} className={"btn-status"}
                                                    onClick={() => this.rejectedOrders()}>REJECTED</Button>
                                        </ButtonGroup>
                                    </center>
                                </div>


                                <Table striped responsive="xl" hover bordered className={"orderHistory-table"}>
                                    <thead>
                                    <tr>
                                        <th className={"text-center"}>Order ID</th>

                                        <th className={"text-center"}>Date</th>
                                        <th className={"text-center"}>Approve Status</th>
                                        <th className={"text-center"}>Payment Status</th>
                                        <th className={"text-center"}>Delivery Status</th>
                                        <th className={"text-center"}>Items</th>
                                        <th className={"text-center"}>Delivery Details</th>
                                        <th className={"text-center"}>Total Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        orders.length === 0 ?
                                            <tr align={"center"}>
                                                <td colSpan={"5"}>No records at the moment</td>
                                            </tr>

                                            : [
                                                orders.map (order =>
                                                    <tr key={order.vendorId}>
                                                        <td style={{verticalAlign: 'middle'}}>{order.orderId}</td>

                                                        <td style={{verticalAlign: 'middle'}}>{order.modifiedDate}</td>
                                                        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                            {order.approvalStatus === "Approved" &&
                                                            <Badge bg="primary" className={"px-3 py-2"} key={"0"}>APPROVED</Badge>
                                                            }
                                                            {order.approvalStatus === "Rejected" &&
                                                            <Badge bg="danger" className={"px-3 py-2"} key={"0"}>REJECTED</Badge>
                                                            }
                                                            {order.approvalStatus === "Pending" &&
                                                            <Badge bg="warning" text="dark" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
                                                            }
                                                            {order.approvalStatus === "Automatically Approved" &&
                                                            <Badge bg="secondary" className={"px-3 py-2"} key={"0"}>AUTOMATICALLY APPROVED</Badge>
                                                            }
                                                        </td>
                                                        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                            {order.paymentStatus === "Paid" &&
                                                            <Badge bg="success" className={"px-3 py-2"} key={"0"}>PAID</Badge>
                                                            }
                                                            {order.paymentStatus === "Pending" &&
                                                            <Badge bg="warning" text="dark" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
                                                            }
                                                            {order.paymentStatus === "Rejected" &&
                                                            <Badge bg="danger"  className={"px-3 py-2"} key={"0"}>REJECTED</Badge>
                                                            }
                                                        </td>
                                                        <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                            {order.deliveryStatus === "Delivered" &&
                                                            <Badge bg="success" className={"px-3 py-2"} key={"0"}>Delivered</Badge>
                                                            }
                                                            {order.deliveryStatus === "Pending" &&
                                                            <Badge bg="warning" text="dark" className={"px-3 py-2"} key={"0"}>PENDING</Badge>
                                                            }
                                                            {order.deliveryStatus === "Rejected" &&
                                                            <Badge bg="danger"  className={"px-3 py-2"} key={"0"}>REJECTED</Badge>
                                                            }
                                                        </td>
                                                        <td style={{verticalAlign: 'middle'}}>
                                                            <Button variant={"outline-primary"}
                                                                    onClick={() => this.showItems(order.orderId)}>
                                                                <FontAwesomeIcon icon={faExternalLinkAlt}/>
                                                            </Button>
                                                        </td>
                                                        <td style={{verticalAlign: 'middle'}}>{order.deliveryDetails}</td>
                                                        <td style={{verticalAlign: 'middle'}}>Rs.{order.total}</td>



                                                    </tr>
                                                )
                                            ]
                                    }
                                    </tbody>
                                </Table>

                                {/*------------------------ Modal Box for ViewMore Page ------------------------*/}
                                <Modal show={this.state.show} onHide={this.closeItems} centered fullscreen={"sm-down"} size={"lg"}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Items</Modal.Title>
                                    </Modal.Header >
                                    <Modal.Body className={"custom-modal-body-login p-0"}>
                                        <Items orderId={this.state.orderId} close={this.closeItems} />
                                    </Modal.Body>
                                </Modal>
                                {/*------------------------------------------------------------------------------*/}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}

export default OrderHistory;
