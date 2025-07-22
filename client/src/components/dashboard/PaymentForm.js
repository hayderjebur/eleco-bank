import React from 'react';
import CreditCards from './ReactCreditCards';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Message from '../../layouts/Message';

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    cardNumber: '',
    calledAddCard: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { userId, loadUser, error, setAlert, clearErrors, data, clearData } =
      this.props;
    if (prevState.calledAddCard !== this.state.calledAddCard) {
      loadUser(userId);
      this.setState({ ...this.state, calledAddCard: false });
    }
    if (prevProps.error !== error) {
      console.log(error);
      setAlert(error, 'danger');
      clearErrors();
    }
    // if (prevProps.date !== data) {
    //   console.log(error);
    //   setAlert(data?.message, 'success');
    //   clearData();
    // }
  }
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { setAlert, addCard } = this.props;
    const { name, cardNumber, expiry, cvc } = this.state;
    if (name === '' || cardNumber === '' || expiry === '' || cvc === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      await addCard({
        name,
        cardNumber,
        expiry,
        cvc,
      });
      this.setState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        cardNumber: '',
        calledAddCard: true,
      });
    }
  };

  render() {
    const { error, data } = this.props;
    console.log(error);
    return (
      <Card>
        <CardBody>
          <CardTitle className='d-flex justify-content-center' tag='h5'>
            Credit Card Info
          </CardTitle>
          {/* {data && data?.message && (
            // <AlertMsg color='success'>{data?.message}</AlertMsg>
          )} */}

          <Row lg='12'>
            <Col className='mt-5' sm='12' lg='5'>
              <CreditCards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.cardNumber}
              />
            </Col>
            <Col className='mx-5'>
              <Form onSubmit={this.onSubmit}>
                <FormGroup className='my-2' controlid='name'>
                  <Label>Name</Label>
                  <Input
                    type='name'
                    name='name'
                    placeholder='Enter name'
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    value={this.state.name}
                  ></Input>
                </FormGroup>
                <FormGroup className='my-2' controlid='name'>
                  <Label>Credit Card cardNumber</Label>
                  <Input
                    type='tel'
                    name='cardNumber'
                    maxLength={16}
                    placeholder='Card cardNumber'
                    // pattern='[\d| ]{16,22}'
                    // required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    value={this.state.cardNumber}
                  ></Input>
                </FormGroup>
                <FormGroup className='my-2' controlid='email'>
                  <Label>Cvc</Label>
                  <Input
                    name='cvc'
                    type='tel'
                    maxLength={3}
                    placeholder='CVC'
                    pattern='\d{3,4}'
                    // required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    value={this.state.cvc}
                  />
                </FormGroup>
                <FormGroup className='my-2' controlid='password'>
                  <Label>expiry</Label>
                  <Input
                    id='examplePassword'
                    name='expiry'
                    maxLength={5}
                    placeholder='Valid Thru'
                    pattern='\d\d/\d\d'
                    // required
                    type='tel'
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    value={this.state.expiry}
                  />
                </FormGroup>

                <Button type='submit' variant='primary' color='success'>
                  Add my card
                </Button>
              </Form>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
