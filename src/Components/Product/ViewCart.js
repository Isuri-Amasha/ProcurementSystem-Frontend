import React, {Component} from "react";
import {Badge, Button, ButtonGroup, Card, Col, Form, ListGroup, Modal, Row, Table} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from "react-router-dom";
import AuthenticationService from "../Login/AuthenticationService";
import * as PropTypes from "prop-types";
import './Product.css';

function Center(props) {
    return null;
}

Center.propTypes = {children: PropTypes.node};

class ViewCart extends Component{

    constructor(props){
        super(props);

        this.state = {
            vendorId: AuthenticationService.loggedUserId(),
            productName:'',
            productPrice:'',
            availability:'',
            quantity:'',
            cartId:'',
            total:0,
            show:false,
            pop:false,
            items:[]
        }
    }

    componentDidMount() {
        this.retrieveById();
    }

    retrieveById = () => {
        axios.get(`http://localhost:8080/cart/`+this.state.vendorId)
            .then(response => {
                console.log(response.data)
                this.setState({
                    vendorId:response.data.vendorId,
                    cartId:response.data.cartId,
                    items:response.data.item,
                    total:response.data.total
                })
            })
            .catch((error) => {
                console.log(error);
            })
        //console.log("items"+this.state.items+"...")
    }

    showModalBox = () => {
        this.setState({show: true,pop:false})
    }

    // //Modal box
    // closeModalBox = () => {
    //     this.setState({show: false})
    //     this.refreshTable();
    // }

    showCart = () => {
        this.setState({pop: true})
    }
    //Modal box
    closeCart = () => {
        this.setState({pop: false})
        this.refreshTable();
    }

    gotoDeliveryDetails() {
        this.props.history.push("/deliveryDetails/");
    }

    deleteItem = (itemId) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover this record!",
            icon: 'warning',
            background: '#fff',
            confirmButtonColor: '#1836d2',
            iconColor: '#ffc200',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.put('http://localhost:8080/cart/' +this.state.vendorId+'/'+itemId)
                    .then(res => {

                        if (res.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Successful',
                                text: "Item has been deleted!!",
                                background: '#fff',
                                confirmButtonColor: '#1836d2',
                                iconColor: '#60e004'
                            })

                            this.retrieveById();
                        }
                    });
            }
        })

    }

    render(){

        const {items,total,vendorId} = this.state;
        return(

            <div className={"wrapper-div"}>

                    <Table striped responsive hover bordered >
                        <thead>
                        <tr>

                            <th className={"text-center"}>Item Name</th>
                            <th className={"text-center"}>Quantity</th>
                            <th className={"text-center"}>Action</th>

                        </tr>
                        </thead>
                        <tbody>
                             {items.map (item =>
                                    <tr key={item.itemId}>

                                        <td style={{verticalAlign: 'middle'}}>{item.itemName}</td>
                                        <td style={{verticalAlign: 'middle'}}>{item.quantity}</td>
                                        <td style={{verticalAlign: 'middle'}}>
                                            <Button variant={"danger"} type={"submit"} key={item.itemId} onClick={() => this.deleteItem(item.itemId)}><FontAwesomeIcon icon={faTimes}/></Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>


                <Row>
                    <Col  md={4} >Total Amount -
                        <Badge bg="success" className={"px-3 py-2"} key={"0"}>Rs.{total}.00</Badge>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }}>

                        <button className={"cnfrm-order-btn"}
                                type={"submit"}
                                key={this.state.vendorId}
                                onClick={() => this.gotoDeliveryDetails()}>
                            Confirm Order
                        </button>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default withRouter(ViewCart);
