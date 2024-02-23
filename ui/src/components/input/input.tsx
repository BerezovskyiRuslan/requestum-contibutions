import React from 'react';
import './input.css';

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  error?: string
}

const Input = ({value, setValue, placeholder = 'Enter url relository GitHub', error = ''}: InputProps) => {

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  return (
    <>
      <input className={"urlInput " + (error ? 'input-error' : '')} value={value} onChange={onChange} placeholder={placeholder}/>
      {error.length ? 
        <div className='container-input-error-message'>
          <span className='input-error-message'>{error}</span>
        </div> 
        : <></>}
    </>
  )
}

export default Input;