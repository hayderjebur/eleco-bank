import React, { useContext, useEffect } from 'react';
import leftLogo from '../assets/images/logos/must.png';
import rightLogo from '../assets/images/logos/al.png';
import AuthContext from '../context/auth/authContext';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function HeaderV2() {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser, loadAllUsers, userId } =
    authContext;
  useEffect(() => {
    loadUser(userId);
    if (user?.isAdmin) {
      loadAllUsers();
    }
  }, [user?.isAdmin, userId]);
  return (
    <div className='text-center mb-4'>
      <div className='d-flex justify-content-around align-items-center m-2 '>
        <Link to='/' className='nav-link'>
          <img src={leftLogo} width={100} height={100} />
        </Link>
        <h2 className=''>Secure Bank System</h2>

        <img src={rightLogo} width={100} height={100} />
      </div>
      {isAuthenticated && user?.isAdmin ? (
        <Button color='danger' onClick={logout}>
          Sign out
        </Button>
      ) : null}
    </div>
  );
}
