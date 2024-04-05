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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (userInfo) {
  //       navigate(redirect);
  //     }
  //   }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      //   toast.error('Passwords do not match');
    } else {
      try {
        // const res = await register({ name, email, password }).unwrap();
        // navigate(redirect);
      } catch (err) {
        // toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row>
        <CardImg
          style={{
            // height: '100vh',
            width: '39rem',
            marginRight: '2rem',
          }}
          alt='Card image cap'
          src={bg1}
        />
      </Row>
      <Row className='mt-4'>
        <h1>Register</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup className='my-2' controlId='name'>
            <Label>Name</Label>
            <Input
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </FormGroup>

          <FormGroup className='my-2' controlId='email'>
            <Label>Email Address</Label>
            <Input
              id='exampleEmail'
              name='email'
              placeholder='with a placeholder'
              type='email'
            />
          </FormGroup>

          <FormGroup className='my-2' controlId='password'>
            <Label>Password</Label>
            <Input
              id='examplePassword'
              name='password'
              placeholder='password placeholder'
              type='password'
            />
          </FormGroup>
          <FormGroup className='my-2' controlId='confirmPassword'>
            <Label>Confirm Password</Label>
            <Input
              id='examplePassword'
              name='password'
              placeholder='password placeholder'
              type='password'
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
