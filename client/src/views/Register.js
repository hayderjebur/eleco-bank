import { useState, useEffect } from 'react';
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
import bg1 from '../assets/images/bg/bg2.jpg';

// import Loader from '../components/Loader';

const RegisterScreen = () => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (userInfo) {
  //       navigate(redirect);
  //     }
  //   }, [navigate, redirect, userInfo]);

  // const alertContext = useContext(AlertContext);
  // const authContext = useContext(AuthContext);

  // const { setAlert } = alertContext;
  // const { register, error, clearErrors, isAuthenticated } = authContext;

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // props.history.push("/");
  //   }

  //   if (error === "User already exists") {
  //     setAlert(error, "danger");
  //     clearErrors();
  //   }
  //   // eslint-disable-next-line
  // }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  // const onSubmit = e => {
  //   e.preventDefault();
  //   if (name === "" || email === "" || password === "") {
  //     setAlert("Please enter all fields", "danger");
  //   } else if (password !== password2) {
  //     setAlert("Passwords do not match", "danger");
  //   } else {
  //     register({
  //       name,
  //       email,
  //       password
  //     });
  //   }
  // };

  return (
    <>
      <Row>
        <CardImg
          style={{
            width: '39rem',
            marginRight: '2rem',
          }}
          alt='Card image cap'
          src={bg1}
        />
      </Row>
      <Row className='mt-4'>
        <h1>Register</h1>
        <Form onSubmit={{}}>
          <FormGroup className='my-2' controlId='name'>
            <Label>Name</Label>
            <Input
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={onChange}
            ></Input>
          </FormGroup>

          <FormGroup className='my-2' controlId='email'>
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

          <FormGroup className='my-2' controlId='password'>
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
          <FormGroup className='my-2' controlId='confirmPassword'>
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

        <Row className='py-3'>
          <Col>
            Already have an account? <Link to={'/login'}>Login</Link>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default RegisterScreen;
