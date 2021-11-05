import React, {Component} from "react";
import axios from "axios";
import {
    Badge,
    Modal,
    Button,
    ButtonGroup,
    Card,
    Table,
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Row, Col
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAd, faCartPlus, faEdit, faPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import './Product.css'

import ProductUpdate from './UpdateProduct';
import AddProduct from './AddProducts';
import ItemQuantity from './ItemQuantity';
import ViewCart from './ViewCart';
import Navbar1 from '../Navbar1'
import AuthenticationService from "../Login/AuthenticationService";
import Swal from "sweetalert2";

class ProductList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            id:'',
            productId:'',
            orderId:'',
            show: false,
            display:false,
            view:false,
            pop:false,
            products: [],
            userRole: AuthenticationService.loggedUserRole(),
            vendorId: AuthenticationService.loggedUserId()
        }
    }

    componentDidMount() {
        this.refreshTable();
    }

    refreshTable = () =>{
        axios.get('http://localhost:8080/product/')
            .then(response => {
                this.setState({products: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    gotoUpdateProduct(id) {
        console.log(id)
        this.setState({
            id: id,
            show: true
        })
    }

    addProduct(){
        this.setState(
            {
                display:true
            }
        )
    }

    gotoAddToCart(orderId) {
        this.setState(
            {
                productId: orderId,
                view:true
            }
        )
    }

    viewCart(vendorId) {
        this.setState(
            {
                vendorId: vendorId,
                pop:true
            }
        )
    }

    deleteProduct = (id) => {

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
                axios.delete('http://localhost:8080/product/' + id)
                    .then(res => {

                        console.log(res.status);
                        if (res.status === 200) {



                            Swal.fire({
                                icon: 'success',
                                title: 'Successful',
                                text: "Classroom has been deleted!!",
                                background: '#fff',
                                confirmButtonColor: '#1836d2',
                                iconColor: '#60e004'
                            })

                            this.refreshTable();
                        }
                    });
            }
        })


    }

    //Modal box
    showModalBox = () => {
        this.setState({show: true})
    }
    //Modal box
    closeModalBox = () => {
        this.setState({show: false})
        this.refreshTable();
    }
    showDetailsBox = () => {
        this.setState({display: true})
    }
    //Modal box
    closeDetailsBox = () => {
        this.setState({display: false})
        this.refreshTable();
    }
    showQuantityBox = () => {
        this.setState({view: true})
    }
    //Modal box
    closeQuantityBox = () => {
        this.setState({view: false})
        this.refreshTable();
    }

    showCart = () => {
        this.setState({pop: true})
    }
    //Modal box
    closeCart = () => {
        this.setState({pop: false})
        this.refreshTable();
    }
    logout = () => {
        AuthenticationService.logout();
        this.props.history.push("/")
    }

    render() {
        const {products} = this.state;
        return (
            <div className={"background"}>
                <div>


                    <Navbar1/>
                </div>



                {/*--------------------------Model Box to Edit Conference--------------------------*/}

                <Modal show={this.state.show} onHide={this.closeModalBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product Update</Modal.Title>
                    </Modal.Header >
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <ProductUpdate classId={this.state.id} close={this.closeModalBox} />
                    </Modal.Body>
                </Modal>

                {/*--------------------------------------------------------------------------------*/}

                {/*------------------------ Modal Box for ViewMore Page ------------------------*/}
                <Modal show={this.state.display} onHide={this.closeDetailsBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title >Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <AddProduct classId={this.state.id} />
                    </Modal.Body>
                </Modal>
                {/*------------------------------------------------------------------------------*/}

                {/*------------------------ Modal Box for ViewMore Page ------------------------*/}
                <Modal show={this.state.view} onHide={this.closeQuantityBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add To Cart</Modal.Title>
                    </Modal.Header >
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <ItemQuantity classId={this.state.productId} close={this.closeQuantityBox} />
                    </Modal.Body>
                </Modal>
                {/*------------------------------------------------------------------------------*/}

                {/*------------------------ Modal Box for ViewMore Page ------------------------*/}
                <Modal show={this.state.pop} onHide={this.closeCart} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Cart</Modal.Title>
                    </Modal.Header >
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <ViewCart classId={this.state.vendorId} close={this.closeCart} />
                    </Modal.Body>
                </Modal>
                {/*------------------------------------------------------------------------------*/}

            </div>

        )
    }



}

export default ProductList;
