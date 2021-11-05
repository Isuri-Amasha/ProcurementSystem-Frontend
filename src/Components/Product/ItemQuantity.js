import {Component} from "react";
import {Form} from "react-bootstrap";
import axios from "axios";
import AuthenticationService from "../Login/AuthenticationService";
import ProductDataService from "./ProductDataService";
import {config} from "@fortawesome/fontawesome-svg-core";
import Swal from "sweetalert2";
import CartDataService from "./CartDataService";

class ItemQuantity extends Component{

    constructor(props){
        super(props);

        this.onChangeQuantity = this.onChangeQuantity.bind(this);

        this.state = {
            productId: props.classId,
            productName:'',
            productPrice:'',
            availability:'',
            quantity:'',
            cartId:'C00',
            total:0,
            item:'',
            vendorId: AuthenticationService.loggedUserId()



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

    retrieveById = () => {
        console.log(this.state.productId);
        axios.get(`http://localhost:8080/product/getbyid/`+this.state.productId)
            .then(response => {
                console.log(response.data)
                this.setState({
                    productId:response.data.productId,
                    productName:response.data.productName,
                    productPrice:response.data.productPrice,
                    availability:response.data.availability

                })

            })
            .catch((error) => {
                console.log(error);
            })
    }
    item;


    onChangeQuantity(e){
        this.setState({
            quantity : e.target.value
        });
        console.log(this.state.quantity);
    }

    handleAddToCart = (e) => {
        e.preventDefault();

        const availability = this.state.availability;
        const vendorId = this.state.vendorId;
        const cartId = this.state.cartId;
        // const productId = this.state.productId;
        // const productName = this.state.productName;

        const item = {
            itemId: this.state.productId,
            itemName: this.state.productName,
            quantity: this.state.quantity,
            itemPrice: this.state.productPrice}

        const array = [];
        array.push(item);
        console.log(array)
        // const availability = this.state.availability;
        // const quantity = this.state.quantity;
        // const productPrice = this.state.productPrice;

        const total = this.state.total;
        // update all including files
        console.log("UPDATING FILE...");

        let cart = {
            vendorId: vendorId,
            cartId: cartId,
            item: array,
            total: total
        }

    if(this.state.quantity < this.state.availability) {

    console.log(cart);
    CartDataService.addToCart(cart)
        .then(res => {
            console.log(res);

            if (res.status === 200) {

                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: 'Added to cart successfully!!',
                    background: '#fff',
                    confirmButtonColor: '#1836d2',
                    iconColor: '#60e004'
                })

                this.props.close();
                this.refreshTable();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!!',
                    text: 'There is an error in adding the item',
                    background: '#fff',
                    confirmButtonColor: '#1836d2',
                    iconColor: '#e00404'
                })
            }
        })

}else{
    Swal.fire({
        icon: 'error',
        title: 'Sorry!!',
        text: 'We do not have enough products to process the order',
        background: '#fff',
        confirmButtonColor: '#1836d2',
        iconColor: '#e00404',

    })

}

        this.refreshTable();

    }

    render(){

        const {productId, productName, productPrice, availability} = this.state
        return(

            <div className={"wrapper-div"}>
                <Form onSubmit={this.handleAddToCart}>

                    <div className={"detail-box-section"}>
                        <div className={"detail-group-left-title"}><label>Product ID </label></div>
                        <div className={"detail-group-right-text"}><input type = "text"
                                                                          required
                                                                          disabled
                                                                          className = "form-control"
                                                                          value = {productId}
                                                                          placeholder={"Enter Product ID"}
                        /></div>
                    </div>

                    <div className={"detail-box-section"}>
                        <div className={"detail-group-left-title"}><label>Product Name </label></div>
                        <div className={"detail-group-right-text"}><input type = "text"
                                                                          required
                                                                          disabled
                                                                          className = "form-control"
                                                                          value={productName}

                                                                          placeholder={"Enter Product Name"}
                        />
                        </div>
                    </div>

                    <div className={"detail-box-section"}>
                        <div className={"detail-group-left-title"}><label>Product Price </label></div>
                        <div className={"detail-group-right-text"}><input type = "text"
                                                                          required
                                                                          className = "form-control"
                                                                          disabled
                                                                          value = {productPrice}

                                                                          placeholder={"Enter Product Price"}
                        /></div>
                    </div>

                    <div className={"detail-box-section"}>
                        <div className={"detail-group-left-title"}><label>Product Availability </label></div>
                        <div className={"detail-group-right-text"}> <input type = "text"
                                                                           required
                                                                           className = "form-control"
                                                                           disabled
                                                                           value = {availability}

                                                                           placeholder={"Enter Product Availability"}
                        /></div>
                    </div>
                    <div className={"detail-box-section"}>
                        <div className={"detail-group-left-title"}><label>Enter Quantity </label></div>
                        <div className={"detail-group-right-text"}> <input type = "text"
                                                                           required
                                                                           className = "form-control"

                                                                           value = {this.state.quantity}
                                                                           onChange = {this.onChangeQuantity}
                                                                           placeholder={"Enter Product Quantity"}
                        /></div>
                    </div>

                    <div >
                        <button className={"add-product-btn"} type={"submit"} >Add Product</button>
                    </div>
                </Form>
            </div>
        )
    }


}
export default ItemQuantity;