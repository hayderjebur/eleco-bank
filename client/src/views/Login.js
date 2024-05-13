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
import bg1 from '../assets/images/bg/bg1.jpg';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import Message from '../layouts/Message';

const Login = (props) => {
  console.log('login page fired');
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
    <Row className='container'>
      <Col sm='12' lg='6' className='offset-md-4'>
        <Card>
          <CardImg
            style={{
              height: '18rem',
            }}
            alt='Card image cap'
            src={bg1}
          />
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
                          'Submit'
                        )}
                      </Button>
                    </Form>
                  </CardBody>
                  <Col className='col-12 py-3'>
                    You don't have an account?{' '}
                    <Link to={'/register'}>Register</Link>
                  </Col>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;
