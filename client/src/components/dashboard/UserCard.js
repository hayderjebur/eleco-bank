import React, { useContext } from 'react';
import {
  CardBody,
  Card,
  UncontrolledDropdown,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import CreditCards from './ReactCreditCards';
import AuthContext from '../../context/auth/authContext';

const UserCard = (props) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser, userId } = authContext;
  return (
    <Card>
      <CardBody>
        <CreditCards
          cvc={props.userCard.cvc}
          expiry={props.userCard.expiry}
          focused={props.userCard.focus}
          name={props.userName}
          number={props.userCard.cardNumber}
        />
      </CardBody>
      {user.isAdmin ? (
        <UncontrolledDropdown group>
          <Button color='primary'>Choose Algorithm</Button>
          <DropdownToggle caret color='primary' />
          <DropdownMenu>
            <DropdownItem>Foo Action</DropdownItem>
            <DropdownItem>Bar Action</DropdownItem>
            <DropdownItem>Quo Action</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ) : null}
    </Card>
  );
};

export default UserCard;
