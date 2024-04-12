import React, { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import { Col, Row } from 'reactstrap';
import ProjectTables from '../components/dashboard/ProjectTable';
import PaymentForm from '../components/dashboard/PaymentForm';
import { useParams } from 'react-router-dom';
import UserCard from '../components/dashboard/UserCard';

const UserProfile = () => {
  const authContext = useContext(AuthContext);
  const { id } = useParams();

  const { users } = authContext;
  const profile = users?.filter((user) => user._id === id);
  const userProfile = profile?.length > 0 ? profile[0] : [];
  return (
    <div>
      {userProfile.cards.length > 0 ? (
        <h3>{userProfile.name} Cards</h3>
      ) : (
        <h3>No Cards</h3>
      )}

      {/*** Cards***/}
      <Row>
        {userProfile.cards?.map((card) => {
          return (
            <Col sm='6' lg='6'>
              <UserCard
                userCard={card}
                userName={userProfile.name}
                bg='bg-light-success text-success'
                title='Profit'
                subtitle='Yearly Earning'
                earning='$21k'
                icon='bi bi-wallet'
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default UserProfile;
