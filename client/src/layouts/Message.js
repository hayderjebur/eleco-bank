import React from 'react';
import { Alert } from 'reactstrap';

const Message = ({ color, children }) => {
  return (
    <div className='text-center'>
      <Alert color={color}>{children}</Alert>
    </div>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
