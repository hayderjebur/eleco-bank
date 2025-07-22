import { CardBody } from 'reactstrap';
import CreditCards from './ReactCreditCards';

const UserCard = ({ userCard, userName }) => {
  return (
    // <Card>
    <CardBody>
      <CreditCards
        cvc={Number(userCard?.cvc)}
        expiry={Number(userCard?.expiry)}
        focused={userCard?.focus}
        name={userName}
        number={Number(userCard?.cardNumber)}
      />
    </CardBody>
    // </Card>
  );
};

export default UserCard;
