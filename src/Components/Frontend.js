import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import OrderList from "./Order/OrderList";
import ProductList from "./Product/ProductList";
import ProductListCustomer from "./Product/ProductListCustomer";
import AddProducts from "./Product/AddProducts";
import PaymentList from "./Payment/PaymentList";
import Login from "./Login/Login"
import Home from "./Home";
import DeliveryDetails from "./Product/DeliveryDetails";
import PaymentDetails from "./Product/PaymentDetails";
import OrderHistory from "./Order/OrderHistory"
import Register from './Login/Register'

class Frontend extends Component {

    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/orders" exact component={OrderList}/>
                        <Route path="/products" exact component={ProductList}/>
                        <Route path="/productsCustomer" exact component={ProductListCustomer}/>
                        <Route path="/addProduct" exact component={AddProducts}/>
                        <Route path="/paymentList" exact component={PaymentList}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/deliveryDetails" exact component={DeliveryDetails}/>
                        <Route path="/paymentDetails/:id" exact component={PaymentDetails}/>
                        <Route path="/orderHistory" exact component={OrderHistory}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Frontend;
