import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Nav, NavItem } from 'reactstrap';
import AuthContext from '../context/auth/authContext';
import Logo from './Logo';

const navigation = [
  {
    title: 'Dashboard',
    href: '/starter',
    icon: 'bi bi-speedometer2',
  },
  {
    title: 'Table',
    href: '/table',
    icon: 'bi bi-layout-split',
  },
];

const Sidebar = () => {
  const authContext = useContext(AuthContext);

  const { logout } = authContext;
  const showMobilemenu = () => {
    document.getElementById('sidebarArea').classList.toggle('showSidebar');
  };
  let location = useLocation();

  return (
    <div className='p-3'>
      <div className='d-flex align-items-center justify-content-center'>
        <Logo />
        <span className='ms-auto d-lg-none'>
          <Button
            close
            size='sm'
            className='ms-auto d-lg-none'
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className='pt-4 mt-2'>
        <Nav vertical className='sidebarNav'>
          {navigation.map((navi, index) => (
            <NavItem key={index} className='sidenav-bg'>
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? 'text-primary nav-link py-3'
                    : 'nav-link text-secondary py-3'
                }
              >
                <i className={navi.icon}></i>
                <span className='ms-3 d-inline-block'>{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Button color='danger' className='mt-3' onClick={logout}>
            Sign out
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
