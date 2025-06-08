import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from 'reactstrap';
import { ReactComponent as LogoWhite } from '../assets/images/logos/xtremelogowhite.svg';
import user1 from '../assets/images/users/user1.jpg';
import leftlogo from '../assets/images/logos/must.png';
import rightLogo from '../assets/images/logos/al.png';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById('sidebarArea').classList.toggle('showSidebar');
  };

  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser, loadAllUsers, userId } =
    authContext;

  useEffect(() => {
    loadUser(userId);
    if (user?.isAdmin) {
      loadAllUsers();
    }
  }, [user?.isAdmin, userId]);

  const onLogout = () => {
    logout();
    //clearContacts();
  };

  return (
    <Navbar color='secondery' dark expand='md'>
      <div className='d-flex align-items-center'>
        <NavbarBrand href='/' className='d-lg-none'></NavbarBrand>
        <Button
          color='primary'
          className='d-lg-none'
          onClick={() => showMobilemenu()}
        >
          <i className='bi bi-list'></i>
        </Button>
      </div>
      <div className='hstack gap-2'>
        <Button
          color='primary'
          size='sm'
          className='d-sm-block d-md-none'
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className='bi bi-x'></i>
          ) : (
            <i className='bi bi-three-dots-vertical'></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className='me-auto' navbar>
          <NavItem>
            <Link to='/' className='nav-link'>
              <img src={leftlogo} width={100} height={100} />
            </Link>
          </NavItem>
        </Nav>

        {isAuthenticated ? (
          <h6 style={{ color: '#ffffff8c' }}> Hello {user && user.name}</h6>
        ) : null}
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color='primary'>
            <img
              src={user1}
              alt='profile'
              className='rounded-circle'
              width='30'
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Profile</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>My Balance</DropdownItem>
            <DropdownItem onClick={onLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavItem>
          <Link to='/' className='nav-link'>
            <img src={rightLogo} width={100} height={100} />
          </Link>
        </NavItem>
      </Collapse>
    </Navbar>
  );
};

export default Header;
