import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
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

const UserCard = (props) => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;
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
