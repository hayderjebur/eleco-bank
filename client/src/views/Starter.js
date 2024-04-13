import React, { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import { Col, Row } from 'reactstrap';
import ProjectTables from '../components/dashboard/ProjectTable';
import UserCard from '../components/dashboard/UserCard';
import PaymentForm from '../components/dashboard/PaymentForm';
import AlertContext from '../context/alert/alertContext';

const Starter = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert, alerts } = alertContext;
  const { addCard, error } = authContext;

  const { user } = authContext;
  return (
    <div>
      {/***Add Card Form***/}
      <Row>
        <Col sm='12' lg='12'>
          <PaymentForm
            error={error}
            setAlert={setAlert}
            alerts={alerts}
            addCard={addCard}
          />
        </Col>
      </Row>
      {/*** Cards***/}
      <Row>
        {user?.cards?.length > 0 ? <h3>Your Cards</h3> : null}
        {user?.cards?.map((card) => {
          return (
            <Col sm='6' lg='6'>
              <UserCard
                userCard={card}
                userName={user.name}
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
      {/***Table ***/}
      {user?.isAdmin ? (
        <Row>
          <Col lg='12'>
            <ProjectTables />
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default Starter;
