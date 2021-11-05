// import {Component} from "react";
// import axios from "axios";
// import {Button, Card, Col, Form, Row} from "react-bootstrap";
//
// class MakePayment extends Component{
//
//     constructor(props) {
//         super(props);
//
//         this.state ={
//             cardDetails: '',
//             cardNo: '',
//             order:'',
//             paymentId: ''
//         }
//     }
//
//     componentDidMount() {
//         this.getPaymentId();
//     }
//
//     getCardDetails = () =>{
//         axios.get(`http://localhost:8080/paymentDummy/${this.state.cardNo}`)
//             .then(response => {
//                 this.setState({cardDetails: response.data})
//                 console.log(response.data)
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }
//
//     getOrderDetail = () =>{
//         axios.get(`http://localhost:8080/order/${this.state.orderId}`)
//             .then(response => {
//                 this.setState({order: response.data})
//                 console.log(response.data)
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }
//
//     getPaymentId = () =>{
//         axios.get('http://localhost:8080/payment/id')
//             .then(response => {
//                 this.setState({paymentId: response.data})
//                 console.log(response.data)
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }
//
//     makePayment = () =>{
//
//     }
//
//     render(){
//         return(
//             <div>
//                 <Card style={{border: 'none'}}>
//                     <Card.Body className={"p-0"}>
//                         <Form onSubmit={this.makePayment}>
//                             <div className = "form-group">
//                                 <Row>
//                                     <Col md={4}>
//                                         <label>Payment ID : </label>
//                                         <input type = "text"
//                                                required
//                                                disabled
//                                                className = "form-control"
//                                                value = {this.state.paymentId}
//                                                placeholder={"Enter conference ID"}
//                                         />
//                                     </Col>
//                                     <Col>
//                                         <label>Order Id : </label>
//                                         <input type = "text"
//                                                required
//                                                disabled
//                                                className = "form-control"
//                                                value = {this.state.order.orderId}
//                                                placeholder={"Enter conference name"}
//                                         />
//                                     </Col>
//                                 </Row>
//                             </div>
//
//                             <div className = "form-group">
//                                 <label>Product Price : </label>
//                                 <textarea
//                                     required
//                                     disabled
//                                     className = "form-control"
//                                     value = {this.state.order.modifiedDate}
//                                     placeholder={"Enter description"}
//                                 />
//                             </div>
//
//                             <div className = "form-group">
//                                 <Row>
//                                     <Col>
//                                         <label>Vendor ID : </label>
//                                         <input type = "text"
//                                                required
//                                                className = "form-control"
//                                                value = {this.state.order.vendorId}
//                                                onChange = {this.onChangeAvailability}
//                                         />
//                                     </Col>
//                                     <Col>
//                                         <label>Vendor Name : </label>
//                                         <input type = "text"
//                                                required
//                                                className = "form-control"
//                                                value = {this.state.order.vendorName}
//                                                onChange = {this.onChangeAvailability}
//                                         />
//                                     </Col>
//                                 </Row>
//                             </div>
//
//                             <div className={"my-4"}>
//                                 <Button variant="primary" type={"submit"}>Submit</Button>
//                             </div>
//                         </Form>
//                     </Card.Body>
//                 </Card>
//             </div>
//         )
//     }
// }
