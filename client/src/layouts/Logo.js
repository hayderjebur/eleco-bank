import logo from '../assets/images/logos/3.png';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/'>
      <img src={logo} height={100} width={100} alt='logo' />
    </Link>
  );
};

export default Logo;
