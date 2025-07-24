import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Nav, NavItem } from 'reactstrap';
import AuthContext from '../context/auth/authContext';

const navigation = [
  {
    title: 'Customer Info',
    href: '/',
    icon: 'bi bi-file-person',
  },
  {
    title: 'Transation History',
    href: '/transation-history',
    icon: 'bi bi-graph-up-arrow',
  },
  {
    title: 'Money transfar',
    href: '/transfar-funds',
    icon: 'bi bi-coin',
  },
  {
    title: 'Add Credit Card',
    href: '/add-card',
    icon: 'bi bi-speedometer2',
  },
];

const Sidebar = () => {
  const authContext = useContext(AuthContext);

  const { logout, user } = authContext;
  const showMobilemenu = () => {
    document.getElementById('sidebarArea').classList.toggle('showSidebar');
  };
  let location = useLocation();
  // console.log(user);

  return (
    <div className='p-3' style={{ height: 'auto' }}>
      <div className='d-flex align-items-center justify-content-center'>
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
