import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardImg,
  Spinner,
} from 'reactstrap';

import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import Message from '../layouts/Message';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert, alerts } = alertContext;
  const { login, error, isLoading, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <Row className='container d-flex justify-content-center'>
      <Col sm='12' lg='6'>
        <Card>
          <CardBody className='p-4'>
            <Row>
              <Col>
                <Card>
                  {error ||
                    (alerts[0]?.msg && (
                      <Message color='danger'>
                        {error || alerts[0]?.msg}
                      </Message>
                    ))}
                  <CardTitle tag='h6' className='border-bottom p-3 mb-0'>
                    <i className='bi bi-bell me-2'> </i>
                    Login
                  </CardTitle>
                  <CardBody>
                    <Form onSubmit={onSubmit}>
                      <FormGroup>
                        <Label for='exampleEmail'>Email</Label>
                        <Input
                          id='exampleEmail'
                          name='email'
                          placeholder='with a placeholder'
                          type='email'
                          value={email}
                          onChange={onChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for='examplePassword'>Password</Label>
                        <Input
                          id='examplePassword'
                          name='password'
                          placeholder='password placeholder'
                          type='password'
                          value={password}
                          onChange={onChange}
                        />
                      </FormGroup>
                      <Button
                        color='primary'
                        className='mt-2'
                        disabled={isLoading}
                        onClick={onSubmit}
                      >
                        {isLoading ? (
                          <>
                            <Spinner size='sm'>Loading...</Spinner>
                            <span> Loading</span>
                          </>
                        ) : (
                          'Login'
                        )}
                      </Button>
                    </Form>
                  </CardBody>
                  <Col className='col-12 p-4'>
                    You don't have an account?{' '}
                    <Link to={'/register'}>Register</Link>
                  </Col>
                </Card>
              </Col>
            </Row>
            <div className='d-flex justify-content-evenly align-items-start '>
              <Link to='/branches'>Branches</Link>
              <Link to='/about'>About Us</Link>
              <Link to='/contact-us'>Contact Us</Link>
            </div>
          </CardBody>

          <p className='text-center'>
            @2025 Secure Bank System. All rights reserved.
          </p>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;
