import { Card, CardBody, CardImg } from 'reactstrap';
import bg1 from '../assets/images/bg/bg1.jpg';
import Forms from './ui/Forms';

const Login = () => {
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
