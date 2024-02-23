import React from 'react';

interface Props {
  message: string
} 

const ErrorMessage = ({ message }: Props) => {
  return message.length ? (
    <div>
      <p>{message}</p>
    </div>
  ) :  <></>
}

export default ErrorMessage;