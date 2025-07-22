import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import { Col, Row, Alert } from 'reactstrap';
import { useParams } from 'react-router-dom';
import UserCard from '../components/dashboard/UserCard';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';

const UserProfile = (props) => {
  const authContext = useContext(AuthContext);
  const { id } = useParams();

  const { users, isAuthenticated, user } = authContext;
  const profile = users?.filter((user) => user._id === id);
  console.log('profile', profile);
  const userProfile = profile?.length > 0 ? profile[0] : [];

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login');
    }
  }, [isAuthenticated, props.history]);

  return (
    <main>
      <div className='pageWrapper d-lg-flex mx-5 '>
        {!user?.isAdmin ? (
          <aside className='sidebarArea shadow' id='sidebarArea'>
            <Sidebar />
          </aside>
        ) : null}
        <div className='text-center p-4'>
          {userProfile?.cards?.length > 0 ? (
            <h3 className='mb-4'>{userProfile.name} Cards</h3>
          ) : (
            <Alert color='primary' className='text-center'>
              {userProfile.name} has No Cards
            </Alert>
          )}

          {/*** Cards***/}
          <div className='contentArea'>
            <Row>
              {userProfile.cards?.map((card) => {
                return (
                  <Col sm='6' lg='6'>
                    <UserCard userCard={card} userName={userProfile.name} />
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
