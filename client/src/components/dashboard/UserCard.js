import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import {
  CardBody,
  Card,
  Dropdown,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import CreditCards from './ReactCreditCards';

const UserCard = (props) => {
  const [value, setValue] = useState('');

  const authContext = useContext(AuthContext);

  const { user, addSignature } = authContext;

  const onSubmit = async (e) => {
    e.preventDefault();
    addSignature(value, props.userCard._id);
  };
  console.log('xxx user card', props.userCard);
  return (
    <Card>
      <CardBody>
        <CreditCards
          cvc={232}
          expiry={23 / 34}
          focused={props.userCard?.focus}
          name={props?.userName}
          number={2324}
        />
      </CardBody>
      {user.isAdmin ? (
        <UncontrolledDropdown group>
          <Button onClick={onSubmit} color={value ? 'success' : 'primary'}>
            {value ? (
              <>
                Submit<span style={{ fontWeight: 'bold' }}> {value} </span>
                algorithm
              </>
            ) : (
              'Choose Algorithm'
            )}
          </Button>
          <DropdownToggle caret color={value ? 'success' : 'primary'} />
          <DropdownMenu>
            <DropdownItem
              onClick={function handleChange(e) {
                setValue(e.target.value);
              }}
              name='Edward'
              value='Edward'
            >
              Edward Curve
            </DropdownItem>
            <DropdownItem
              onClick={function handleChange(e) {
                setValue(e.target.value);
              }}
              name='Koblite'
              value='Koblite'
            >
              Koblite Curve
            </DropdownItem>
            <DropdownItem
              onClick={function handleChange(e) {
                setValue(e.target.value);
              }}
              name='xxx'
              value='xxx'
            >
              Quo Action
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ) : null}
    </Card>
  );
};

export default UserCard;
