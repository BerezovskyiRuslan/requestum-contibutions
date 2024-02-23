import React from 'react';
import './buttonGo.css';

interface Props {
  value: string;
  onClick: () => void
}

const ButtonGo = ({ value, onClick }: Props) => {
  return <button className="button-go" onClick={onClick}>{ value }</button>
}

export default ButtonGo;