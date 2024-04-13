import React, { useContext } from 'react';
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
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Message from '../../layouts/Message';

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    cardNumber: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { setAlert, addCard } = this.props;
    const { name, cardNumber, expiry, cvc } = this.state;
    if (name === '' || cardNumber === '' || expiry === '' || cvc === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      addCard({
        name,
        cardNumber,
        expiry,
        cvc,
      });
    }
  };

  render() {
    const { alerts, error } = this.props;
    return (
      <Card>
        <CardBody>
          <CardTitle className='d-flex justify-content-center' tag='h5'>
            Credit Card Info
          </CardTitle>
          {error ||
            (alerts[0]?.msg && (
              <Message color='danger'>{error || alerts[0]?.msg}</Message>
            ))}

          <Row>
            <Col className='mt-5' sm='12' lg='4'>
              <CreditCards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.cardNumber}
              />
            </Col>
            <Col lg='7'>
              <Form onSubmit={this.onSubmit}>
                <FormGroup className='my-2' controlid='name'>
                  <Label>Name</Label>
                  <Input
                    type='name'
                    name='name'
                    placeholder='Enter name'
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  ></Input>
                </FormGroup>
                <FormGroup className='my-2' controlid='name'>
                  <Label>Credit Card cardNumber</Label>
                  <Input
                    type='tel'
                    name='cardNumber'
                    maxLength={16}
                    placeholder='Card cardNumber'
                    pattern='[\d| ]{16,22}'
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
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
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
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
                    required
                    type='tel'
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
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
