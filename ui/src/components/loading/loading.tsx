import React from 'react';
import './loading.css';

interface Props {
  isLoading: boolean;
}

const Loading = ({ isLoading }: Props) => {
  return isLoading ? <div className="loader"></div> : <></>;
}

export default Loading;