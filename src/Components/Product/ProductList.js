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
    Form,
    NavDropdown,
    Row, Col, InputGroup
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAd, faCartPlus, faEdit, faPlus, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
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
            filterCategory:'',
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

    gotoDetails = (id) => {
        // set show:true so the modal box will be visible
        // set id to pass it to the next component through props,

        this.setState({
            id: id,
            show: true
        })
    }

    filterByCategory = (e) =>{
        this.setState({filterCategory: e.target.value});




            axios.get(`http://localhost:8080/product/getbycategory/${e.target.value}`)
                .then(response => {
                    console.log(response.data)
                    this.setState({products: response.data})
                })
                .catch((error) => {
                    console.log(error);
                })

    }

    render() {
        const {products} = this.state;
        return (
            <div className={"background"}>
                <div>


                    <Navbar1/>
                </div>
                {this.state.userRole === "Site Manager" &&
                <Card className={"crd-product-tb1"}>
                    <Card.Body>

                        <Card.Title className={"crd-product-title1"}>
                            <Row>
                                <Col md={4}>Products List</Col>

                                <Col md={{span: 4, offset: 4}}>


                                    <button className={"cart-icn"} type={"submit"}
                                            onClick={() => this.viewCart(this.state.vendorId)}>
                                        <FontAwesomeIcon icon={faCartPlus}/></button>

                                </Col>

                            </Row>

                            <Row>
                                <Col xl={5} lg={5}>
                                    <Form.Group as={Col} controlId={"formClassroomGrade"}>
                                        <Form.Select onChange={this.filterByCategory}>
                                            <option onClick={() => this.refreshTable()}>Open this select menu</option>
                                            <option value="Tools">Tools</option>
                                            <option value="Safety">Safety Equipments</option>
                                            <option value="Measuring">Measuring Equipments</option>
                                            <option value="Nails">Nails</option>
                                            <option value="Roofing">Roofing</option>
                                            <option value="Flooring">Flooring</option>
                                            <option value="Other">Other</option>

                                        </Form.Select>

                                    </Form.Group>
                                </Col>
                                <Col>
                                    {/* works for all the filters */}
                                    <Button className={"clear-filter-btn"}
                                            onClick={this.refreshTable}>
                                        Clear Filters
                                    </Button>
                                </Col>



                            </Row>
                        </Card.Title>

                        <Row>
                            {
                                products.length === 0 ?
                                    <div align="center">
                                        <h4 className={"mt-3"}>No products are available.</h4>
                                    </div>

                                    : [
                                        this.state.products.map(event =>

                                            <Col className={"mb-5"} key={event.id} sm={4}>
                                                <Card className={"st-class-card"}
                                                      onClick={() => this.gotoAddToCart(event.productId)}>
                                                    {/*<Row className={"st-card-header"}>*/}
                                                    {/*    <Col className={"text-start"}>{event.productName}</Col>*/}
                                                    {/*    <Col className={"text-end"}>{event.productPrice}</Col>*/}
                                                    {/*</Row>*/}
                                                    <center>

                                                        <Card.Img variant="top" className={"st-class-img"}
                                                                  src={`http://localhost:8080/product/image/${event.img_fileId}`}

                                                        />
                                                    </center>
                                                    <Card.Body className={"px-3"}>
                                                        <Card.Title className={"mb-2 st-card-title"}>
                                                            <Row className={"st-card-header"}>
                                                                <Col className={"text-start"}>{event.productName}</Col>
                                                                <Col className={"prd-price"} >Rs.{event.productPrice}.00</Col>
                                                            </Row>



                                                           </Card.Title>

                                                            <Row className={"st-card-details"}>
                                                               Availability - {event.availability}
                                                            </Row>
                                                            <Row className={"st-card-details"}s>
                                                                Unit - {event.productPrice}
                                                            </Row>
                                                        {/*<Row className={"mx-0 st-card-footer"}>*/}
                                                        {/*    <Col className={"px-0"}>*/}
                                                        {/*        <Badge className={"st-card-badge"}>*/}
                                                        {/*            <FontAwesomeIcon icon={faCalendarAlt}/> &nbsp; {moment(event.date).format("YYYY-MM-DD")}*/}
                                                        {/*        </Badge>*/}
                                                        {/*    </Col>*/}
                                                        {/*    <Col className={"px-0 text-end"}>*/}
                                                        {/*        <Badge className={"st-card-badge"}>*/}
                                                        {/*            <FontAwesomeIcon icon={faClock}/> &nbsp; {event.time}*/}
                                                        {/*        </Badge>*/}
                                                        {/*    </Col>*/}
                                                        {/*</Row>*/}
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    ]
                            }
                        </Row>


                        {/*<div className={"main-div"}>*/}
                        {/*    <Table striped responsive hover bordered className={"product-table"}>*/}
                        {/*        <thead>*/}
                        {/*        <tr>*/}
                        {/*            <th className={"text-center"}>Product ID</th>*/}
                        {/*            <th className={"text-center"}>Product Name</th>*/}
                        {/*            <th className={"text-center"}>Item Price</th>*/}
                        {/*            <th className={"text-center"}>Availability</th>*/}

                        {/*            <th className={"text-center"}>Purchase</th>*/}



                        {/*        </tr>*/}
                        {/*        </thead>*/}
                        {/*        <tbody>*/}
                        {/*        {*/}
                        {/*            products.length === 0 ?*/}
                        {/*                <tr align={"center"}>*/}
                        {/*                    <td colSpan={"5"}>No records at the moment</td>*/}
                        {/*                </tr>*/}

                        {/*                : [*/}
                        {/*                    products.map(product =>*/}
                        {/*                        <tr key={products.productId}>*/}
                        {/*                            <td style={{verticalAlign: 'middle'}}>{product.productId}</td>*/}
                        {/*                            <td style={{verticalAlign: 'middle'}}>{product.productName}</td>*/}
                        {/*                            <td style={{verticalAlign: 'middle'}}>Rs.{product.productPrice}</td>*/}
                        {/*                            <td style={{verticalAlign: 'middle'}}>{product.availability}</td>*/}

                        {/*                            <td className={"text-center"} style={{verticalAlign: 'middle'}}>*/}
                        {/*                                <ButtonGroup>*/}
                        {/*                                    <Button variant={"outline-primary"} type={"submit"}*/}
                        {/*                                            key={product.productId}*/}
                        {/*                                            onClick={() => this.gotoAddToCart(product.productId)}><FontAwesomeIcon*/}
                        {/*                                        icon={faPlus}/> Add to cart*/}
                        {/*                                    </Button>*/}

                        {/*                                </ButtonGroup>*/}
                        {/*                            </td>*/}

                        {/*                        </tr>*/}
                        {/*                    )*/}
                        {/*                ]*/}
                        {/*        }*/}
                        {/*        </tbody>*/}
                        {/*    </Table>*/}

                        {/*</div>*/}
                    </Card.Body>
                </Card>
                }
                {this.state.userRole === "Accounting Staff" &&


                <Card className={"crd-product-tb"}>
                    <Card.Body>
                        <Card.Title className={"crd-product-title"}>
                            <Row>
                                <Col md={4}>Products List</Col>

                                <Col md={{span: 4, offset: 4}}>

                                    <button className={"add-product"} type={"submit"} onClick={() => this.addProduct()}>
                                        <FontAwesomeIcon icon={faPlus}/> Add Product</button>


                                </Col>

                            </Row>
                        </Card.Title>
                        <div className={"main-div"}>
                            <Table striped responsive hover bordered className={"product-table"}>
                                <thead>
                                <tr>
                                    <th className={"text-center"}>Product ID</th>
                                    <th className={"text-center"}>Product Name</th>
                                    <th className={"text-center"}>Item Price</th>
                                    <th className={"text-center"}>Availability</th>
                                    <th className={"text-center"}>Unit</th>


                                    <th className={"text-center"}>Action</th>

                                </tr>
                                </thead>
                                <tbody>
                                {
                                    products.length === 0 ?
                                        <tr align={"center"}>
                                            <td colSpan={"5"}>No records at the moment</td>
                                        </tr>

                                        : [
                                            products.map(product =>
                                                <tr key={products.productId}>
                                                    <td style={{verticalAlign: 'middle'}}>{product.productId}</td>
                                                    <td style={{verticalAlign: 'middle'}}>{product.productName}</td>
                                                    <td style={{verticalAlign: 'middle'}}>Rs.{product.productPrice}</td>
                                                    <td style={{verticalAlign: 'middle'}}>{product.availability}</td>
                                                    <td style={{verticalAlign: 'middle'}}>{product.unit}</td>

                                                    <td className={"text-center"} style={{verticalAlign: 'middle'}}>
                                                        <ButtonGroup>
                                                            <Button variant={"warning"} type={"submit"}
                                                                    key={product.productId}
                                                                    onClick={() => this.gotoUpdateProduct(product.productId)}>
                                                                <FontAwesomeIcon icon={faEdit}/> </Button>
                                                            <Button variant={"danger"} type={"submit"}
                                                                    key={product.productId}
                                                                    onClick={() => this.deleteProduct(product.productId)}>
                                                                <FontAwesomeIcon icon={faTrashAlt}/></Button>

                                                        </ButtonGroup>
                                                    </td>


                                                </tr>
                                            )
                                        ]
                                }
                                </tbody>
                            </Table>

                        </div>
                    </Card.Body>
                </Card>



                }
                { (this.state.userRole === "Management Staff" || this.state.userRole === "Delivery Manager") &&


                <Card className={"crd-product-tb"}>
                    <Card.Body>
                        <Card.Title className={"crd-product-title"}>
                            <Row>
                                <Col md={4}>Products List</Col>



                            </Row>
                        </Card.Title>
                        <div className={"main-div"}>
                            <Table striped responsive hover bordered className={"product-table"}>
                                <thead>
                                <tr>
                                    <th className={"text-center"}>Product ID</th>
                                    <th className={"text-center"}>Product Name</th>
                                    <th className={"text-center"}>Item Price</th>
                                    <th className={"text-center"}>Availability</th>
                                    <th className={"text-center"}>Unit</th>




                                </tr>
                                </thead>
                                <tbody>
                                {
                                    products.length === 0 ?
                                        <tr align={"center"}>
                                            <td colSpan={"5"}>No records at the moment</td>
                                        </tr>

                                        : [
                                            products.map(product =>
                                                <tr key={products.productId}>
                                                    <td style={{verticalAlign: 'middle'}}>{product.productId}</td>
                                                    <td style={{verticalAlign: 'middle'}}>{product.productName}</td>
                                                    <td style={{verticalAlign: 'middle'}}>Rs.{product.productPrice}</td>
                                                    <td style={{verticalAlign: 'middle'}}>{product.availability}</td>
                                                    <td style={{verticalAlign: 'middle'}}>{product.unit}</td>




                                                </tr>
                                            )
                                        ]
                                }
                                </tbody>
                            </Table>

                        </div>
                    </Card.Body>
                </Card>



                }

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
