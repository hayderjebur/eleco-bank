import React, { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import { Col, Row, Alert } from 'reactstrap';
import { useParams } from 'react-router-dom';
import UserCard from '../components/dashboard/UserCard';

const UserProfile = () => {
  const authContext = useContext(AuthContext);
  const { id } = useParams();

  const { users } = authContext;
  const profile = users?.filter((user) => user._id === id);
  const userProfile = profile?.length > 0 ? profile[0] : [];

  return (
    <div className='text-center'>
      {userProfile.cards.length > 0 ? (
        <h3>{userProfile.name} Cards</h3>
      ) : (
        <Alert color='primary' className='text-center'>
          {userProfile.name} has No Cards
        </Alert>
      )}

      {/*** Cards***/}
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
  );
};

export default UserProfile;
