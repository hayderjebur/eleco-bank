import React, { useState, useContext, useEffect } from 'react';
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
  Spinner,
} from 'reactstrap';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Message from '../../layouts/Message';
import Sidebar from '../../layouts/Sidebar';
function TransfarFundsForm() {
  const [card, setCard] = useState({
    recipientCardNumber: '',
    sendFromCardNumber: '',
    focus: '',
    amount: 0,
    cvc: '',
  });

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert, alerts } = alertContext;

  const { transfarFunds, isLoading, error, data, clearErrors } = authContext;

  const { sendFromCardNumber, recipientCardNumber, amount, cvc } = card;
  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, data?.message]);
  const onChange = (e) => setCard({ ...card, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      sendFromCardNumber === '' ||
      recipientCardNumber === '' ||
      amount === 0 ||
      cvc === ''
    ) {
      setAlert('Please fill in all fields', 'danger');
    } else {
      const res = await transfarFunds({
        amount,
        sendFromCardNumber,
        recipientCardNumber,
        cvc,
      });

      if (res === 'done') {
        setAlert(data?.message, 'success');
        setCard({
          amount: 0,
          recipientCardNumber: '',
          sendFromCardNumber: '',
          cvc: '',
          focus: '',
        });
      }
    }
  };
  return (
    <div className='pageWrapper d-lg-flex justify-content-center mx-5 w-100'>
      {/* <asid className='sidebarArea shadow mx-5' id='sidebarArea'> */}
      <Sidebar />
      {/* </asid> */}
      <div className='w-100'>
        <Row className='container d-flex justify-content-center'>
          <Col sm='12'>
            <Card>
              <CardBody className='p-4'>
                <Row>
                  <Col>
                    <Card>
                      {alerts[0]?.msg && (
                        <Message color={`${alerts[0]?.type}`}>
                          {alerts[0]?.msg}
                        </Message>
                      )}
                      <CardTitle tag='h6' className='border-bottom p-3 mb-0'>
                        <i className='bi bi-bell me-2'> </i>
                        Transfar Funds
                      </CardTitle>
                      <CardBody>
                        <Form onSubmit={onSubmit}>
                          <div className='d-flex'>
                            <FormGroup
                              style={{ minWidth: '75%' }}
                              className='my-2 w-70'
                              controlid='name'
                            >
                              <Label>Send From:</Label>
                              <Input
                                type='tel'
                                name='sendFromCardNumber'
                                maxLength={16}
                                placeholder='Card Number'
                                onChange={onChange}
                                onFocus={onChange}
                                value={sendFromCardNumber}
                              ></Input>
                            </FormGroup>
                            <FormGroup
                              style={{ maxWidth: '4rem' }}
                              className='mx-4 my-2'
                              controlid='name'
                            >
                              <Label>CVC</Label>
                              <Input
                                type='tel'
                                name='cvc'
                                maxLength={3}
                                placeholder='CVC'
                                onChange={onChange}
                                onFocus={onChange}
                                value={cvc}
                              ></Input>
                            </FormGroup>
                          </div>
                          <FormGroup
                            style={{ maxWidth: '75%' }}
                            className='my-2 '
                            controlid='name'
                          >
                            <Label>Send to:</Label>
                            <Input
                              type='tel'
                              name='recipientCardNumber'
                              maxLength={16}
                              placeholder='Card Number'
                              onChange={onChange}
                              onFocus={onChange}
                              value={recipientCardNumber}
                            ></Input>
                          </FormGroup>

                          <FormGroup
                            style={{ maxWidth: '75%' }}
                            className='my-2'
                            controlid='password'
                          >
                            <Label>Amount of Money</Label>
                            <Input
                              id='exampleAmount'
                              name='amount'
                              maxLength={5}
                              placeholder='Amount of Money'
                              //   pattern='\d\d/\d\d'
                              // required
                              type='number'
                              onChange={onChange}
                              onFocus={onChange}
                              value={amount}
                            />
                          </FormGroup>
                          <Button
                            color='success'
                            className='mt-2 px-4'
                            disabled={isLoading}
                            onClick={onSubmit}
                          >
                            {isLoading ? (
                              <>
                                <Spinner size='sm'>Loading...</Spinner>
                                <span> Loading</span>
                              </>
                            ) : (
                              'Send'
                            )}
                          </Button>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default TransfarFundsForm;
