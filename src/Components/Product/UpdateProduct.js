import React, {Component} from "react";
import Swal from "sweetalert2";
import {Accordion, Container, Button, Card, Col, Form, Image, Row, CardImg} from "react-bootstrap";
import axios from "axios";


class UpdateProduct extends Component{

    constructor(props){
        super(props);

        this.state = {
            productId: props.classId,
            productName:'',
            productPrice:'',
            availability:'',
            unit:'',
            img_filename: undefined,
            img_fileId : undefined



        }
    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        this.retrieveById();
    }


    retrieveById = () => {
        axios.get(`http://localhost:8080/product/getbyid/`+this.state.productId)
            .then(response => {
                console.log(response.data)
                this.setState({
                    productId:response.data.productId,
                    productName:response.data.productName,
                    productPrice:response.data.productPrice,
                    availability:response.data.availability,
                    unit:response.data.unit,
                    img_fileId:response.data.img_fileId


                })

            })
            .catch((error) => {
                console.log(error);
            })
    }




    handleUpdate = (e) => {
        e.preventDefault();

        const product = {
            productId: this.state.productId,
            productName: this.state.productName,
            productPrice: this.state.productPrice,
            availability: this.state.availability,
            unit:this.state.unit
        }

        axios.post('http://localhost:8080/product/', product)
                .then(res => {
                    console.log(res);

                    if (res.status === 200) {

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Classroom has been updated!!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })

                        this.props.close();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error in updating!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#e00404'
                        })
                    }
                })
        }





    render() {

        const {productId, productName, productPrice, availability,unit,img_fileId} = this.state

        return(


            <Card style={{border:'none'}}>
                <Card.Body>
                    <Form onSubmit={this.handleUpdate}>




                        <Form.Group >
                            <Form.Label >Product ID</Form.Label>
                            <Form.Control  as={"input"} name={"productId"} placeholder={"Enter a product id"}  required disabled
                                           value={productId} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control as={"input"} name={"productName"} placeholder={"Enter product name"} required
                                          value={productName} onChange={this.handleChange}/>
                        </Form.Group>



                        <Form.Group >
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control as={"input"} name={"productPrice"} placeholder={"Enter product price"} required
                                          value={productPrice} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Availability</Form.Label>
                            <Form.Control as={"input"} name={"availability"} placeholder={"Enter availability"} required
                                          value={availability} onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Unit</Form.Label>
                            <Form.Control as={"input"} name={"unit"} placeholder={"Enter unit"} required
                                          value={unit} onChange={this.handleChange}/>
                        </Form.Group>



                        <div className={"text-end"}>

                            <button type={"submit"} className={"update-product-btn"}>Update Product</button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>





        )
    }


}
export default UpdateProduct;
