import React, {Component} from "react";
// import '../../AdminDashboard/AdminNav.css';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import moment from 'moment';
import "./Product.css"
import PaymentDataService from "./PaymentDataService";
import OrderDataService from "../Order/OrderDataService";
import * as Swal from "sweetalert2";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCartPlus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from "axios";
import AuthenticationService from "../Login/AuthenticationService";
import CartDataService from "./CartDataService";
import Navbar1 from "../Navbar1";
import './Delivery.css'

class DeliveryDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vendorId: AuthenticationService.loggedUserId(),
            vendorName: AuthenticationService.loggedUserName(),
            orderId:'',
            total: 0,
            cartId: '',
            items: [],
            address: '',
            modifiedDate: moment(new Date()).format('YYYY-MM-DD'),
            month: new Date().getMonth() + 1,
            today: moment(new Date()).format('YYYY-MM-DD'),
        }
    }

    componentDidMount() {
        this.getOrderId()
        this.getCartById()
    }

    // get order details
    getOrderId = () => {
        axios.get('http://localhost:8080/order/id')
            .then(response => {
                this.setState({
                    orderId: response.data,
                })
            })
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    getCartById = () => {
        axios.get(`http://localhost:8080/cart/` + this.state.vendorId)
            .then(response => {
                console.log(response.data)
                this.setState({
                    cartId: response.data.cartId,
                    items: response.data.item,
                    total: response.data.total
                })
                console.log("items"+this.state.items)
                console.log("total"+this.state.total)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    addOrder = (event) => {
        event.preventDefault();

        const order = {
            orderId: this.state.orderId,
            modifiedDate: this.state.modifiedDate,
            vendorId: this.state.vendorId,
            vendorName: this.state.vendorName,
            paymentStatus:'',
            approvalStatus:'',
            deliveryStatus:'',
            deliveryDetails: this.state.address,
            item: this.state.items,
            total: this.state.total
        }

        console.log(order)
        axios.post(`http://localhost:8080/order/`, order)
            .then(res => {
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    html: '<p>Order Successfully Added</p>',
                    background: '#fff',
                    confirmButtonColor: '#1836d2',
                    iconColor: '#60e004'
                })
            }
            else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Error!',
                    html: '<p>Please Try Again</p>',
                    background: '#fff',
                    confirmButtonColor: '#1836d2',
                    iconColor: '#cc1919'
                })
            }
        })
    }



    render() {
        return (
            <div className={"background"}>
                <div>
                    <Navbar1/>
                </div>
                <Card className={"crd-product-tb"}>
                    <Card.Body>
                            <Row>
                                <Col  md={4} ><div className={"crd-product-title"}>Delivery Details</div></Col>
                                <Col md={{ span: 4, offset: 4 }}>
                                    {this.state.userRole === "Site Manager" &&
                                    <Button  varient={"primary"} type={"submit"} >
                                        <FontAwesomeIcon icon={faCartPlus}/>{this.state.orderId}</Button>
                                    }
                                </Col>
                            </Row>
                        <div className={"main-div"}>
                            <Form onSubmit={this.addOrder}>
                                <Form.Group controlId={"formCardName"} className={"delivery-grp"}>
                                    <Form.Label className={"delivery-lbl"}>Enter the delivery address</Form.Label>
                                    <Form.Control type={"text"} name={"address"}
                                                  className={"delivery-input"}
                                                  required
                                                  placeholder={"Delivery Address"}
                                                  value={this.state.address}
                                                  onChange={this.handleChange}/>

                                    {/*<Form.Control type={"text"} name={"cardNo"}*/}
                                    {/*              className={"delivery-input"}*/}
                                    {/*              required*/}
                                    {/*              placeholder={"Card Number"}*/}
                                    {/*              value={this.state.cardNo}*/}
                                    {/*              onChange={this.handleChange}/>*/}
                                </Form.Group>
                                <Form.Group controlId={"formSubmitBtn"} className={"text-center"}>
                                    <button type={"submit"} className={"delivery-btn"}>Confirm Your Order</button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default DeliveryDetails;
