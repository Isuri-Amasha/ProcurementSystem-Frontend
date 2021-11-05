import React, {Component} from "react";
import {Badge, Button, ButtonGroup, Col, Row, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from "react-router-dom";
import axios from "axios";

class Items extends Component{

    constructor(props) {
        super(props);

        this.state = {
            show: '',
            orderId: props.orderId,
            items: [],
            total:0
        }
    }

    componentDidMount() {
        this.getOrder()
    }

    //Modal box
    showItems = () => {
        this.setState({show: true})
    }
    closeItems = () => {
        this.setState({show: false})
        this.props.close()
    }

    getOrder = () =>{
        axios.get(`http://localhost:8080/order/`+this.state.orderId)
            .then(response => {
                console.log(response.data)
                this.setState({
                    items: response.data.item,
                    total: response.data.total
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render(){

        const {items,total} = this.state;
        return(

            <div className={"wrapper-div"}>

                <Table striped responsive hover bordered >
                    <thead>
                    <tr>

                        <th className={"text-center"}>Item Name</th>
                        <th className={"text-center"}>Quantity</th>
                        <th className={"text-center"}>Item Price</th>
                        <th className={"text-center"}>Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map (item =>
                        <tr key={item.itemId}>
                            <td style={{verticalAlign: 'middle'}}>{item.itemName}</td>
                            <td style={{verticalAlign: 'middle'}}>{item.quantity}</td>
                            <td style={{verticalAlign: 'middle'}}>{item.itemPrice}</td>
                            <td style={{verticalAlign: 'middle'}}>{item.itemPrice * item.quantity}</td>
                        </tr>
                    )}
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
                                onClick={() => this.closeItems()}>
                            CANCEL
                        </button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Items);
