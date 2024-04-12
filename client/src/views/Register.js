import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardImg,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import Message from '../layouts/Message';

const RegisterScreen = (props) => {
  const navigate = useNavigate();

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert, alerts } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/starter');
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <>
      <Row className='container'>
        <Col sm='12' lg='6' className='mt-4 offset-md-4'>
          {error ||
            (alerts[0]?.msg && (
              <Message color='danger'>{error || alerts[0]?.msg}</Message>
            ))}
          <h1>Register</h1>
          <Form onSubmit={onSubmit}>
            <FormGroup className='my-2' controlid='name'>
              <Label>Name</Label>
              <Input
                name='name'
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={onChange}
              ></Input>
            </FormGroup>

            <FormGroup className='my-2' controlid='email'>
              <Label>Email Address</Label>
              <Input
                id='exampleEmail'
                name='email'
                placeholder='with a placeholder'
                type='email'
                value={email}
                onChange={onChange}
              />
            </FormGroup>

            <FormGroup className='my-2' controlid='password'>
              <Label>Password</Label>
              <Input
                id='examplePassword'
                name='password'
                placeholder='password placeholder'
                type='password'
                value={password}
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup className='my-2' controlid='confirmPassword'>
              <Label>Confirm Password</Label>
              <Input
                id='examplePassword'
                name='confirmPassword'
                placeholder='password placeholder'
                type='password'
                value={confirmPassword}
                onChange={onChange}
              />
            </FormGroup>

            <Button type='submit' variant='primary'>
              Register
            </Button>

            {/* {isLoading && <Loader />} */}
          </Form>
          <Col className='col-12 py-3'>
            Already have an account? <Link to={'/login'}>Login</Link>
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default RegisterScreen;
