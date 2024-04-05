import { Card, CardBody, CardImg } from 'reactstrap';
import bg1 from '../assets/images/bg/bg1.jpg';
import Forms from './ui/Forms';
import { useEffect, useState } from 'react';

const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  // const alertContext = useContext(AlertContext);
  // const authContext = useContext(AuthContext);

  // const { setAlert } = alertContext;
  // const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    // if (isAuthenticated) {
    //   props.history.push("/");
    // }
    // if (error === 'Invalid Credentials') {
    //   // setAlert(error, "danger");
    //   // clearErrors();
    // }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (email === '' || password === '') {
  //     setAlert('Please fill in all fields', 'danger');
  //   } else {
  //     login({
  //       email,
  //       password,
  //     });
  //   }
  // };
  return (
    <Card>
      <CardImg
        style={{
          height: '15rem',
        }}
        alt='Card image cap'
        src={bg1}
      />
      <CardBody className='p-4'>
        <Forms />
      </CardBody>
    </Card>
  );
};
export default Login;
