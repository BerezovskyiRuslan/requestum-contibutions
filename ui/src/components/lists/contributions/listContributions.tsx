import React from 'react';
import './listContributions.css';

interface Contribution {
  id: number;
  login: string;
  avatar_url: string;
  url_html: string;
}

interface Props {
  list: [Contribution] | []
}

const ListContributions = ({ list }: Props) => {
  return (
    <div className='container-contribution-list'>
      <div className='container-contribution-header-list'>
        <div className='contribution-heder-list-item'>#</div>
        <div className='contribution-heder-list-item'>Avatar</div>
        <div className='contribution-heder-list-item'>Name</div>
      </div>
      <div>
        {list.map((contribution, idx) => {
          return (
            <div className='context-list-contribution' key={contribution.id}>
              <div className='context-list-contribution-item'>{idx + 1 }</div>
              <div className='context-list-contribution-item'>
                <img 
                  className='context-list-contribution-item-img'
                  src={contribution.avatar_url} 
                  alt='avatar_contribution'
                />
              </div>
              <div className='context-list-contribution-item'>
                <a 
                  href={contribution.url_html}
                  title={contribution.login}
                  target="_blank" rel="noreferrer"
                >
                  {contribution.login}
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListContributions;
