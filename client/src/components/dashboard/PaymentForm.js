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

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    // console.log(e.target.name);
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  // const navigate = useNavigate();

  //   useEffect(() => {
  //     if (userInfo) {
  //       navigate(redirect);
  //     }
  //   }, [navigate, redirect, userInfo]);

  // const submitHandler = async (e) => {
  //   e.preventDefault();

  // if (password !== confirmPassword) {
  //   toast.error('Passwords do not match');
  // } else {
  //   try {
  // const res = await register({ name, email, password }).unwrap();
  // navigate(redirect);
  //   } catch (err) {
  //     // toast.error(err?.data?.message || err.error);
  //   }
  // }
  render() {
    return (
      // <div>
      <Card>
        <CardBody>
          <CardTitle className='d-flex justify-content-center' tag='h5'>
            Credit Card Info
          </CardTitle>

          <Row>
            <Col className='mt-5' sm='12' lg='4'>
              <CreditCards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.number}
              />
            </Col>
            <Col lg='7'>
              <Form onSubmit={{}}>
                <FormGroup className='my-2' controlId='name'>
                  <Label>Name</Label>
                  <Input
                    type='name'
                    name='name'
                    placeholder='Enter name'
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  ></Input>
                </FormGroup>
                <FormGroup className='my-2' controlId='name'>
                  <Label>Credit Card Number</Label>
                  <Input
                    type='tel'
                    name='number'
                    maxLength={16}
                    placeholder='Card Number'
                    pattern='[\d| ]{16,22}'
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  ></Input>
                </FormGroup>
                <FormGroup className='my-2' controlId='email'>
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
                <FormGroup className='my-2' controlId='password'>
                  <Label>expiry</Label>
                  <Input
                    id='examplePassword'
                    name='expiry'
                    maxLength={4}
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
