import React, { useState } from 'react';
import './listRepos.css';
import ListContributions from '../contributions/listContributions';
import { Repos } from '../../../types/interfaces/repos';

interface Props {
  list: Repos[];
}

const ListRepos = ({ list }: Props) => {
  const [isContributions, setIsContributions] = useState(0);

  const showContributions = (index: number) => {
    if (isContributions === index) {
      return setIsContributions(0);
    }

    setIsContributions(index);
  }
  
  return list.length ? (
    <div className='container-list'>
       <div className='container-header-list'>
        <div className='header-list-item'>#</div>
        <div className='header-list-item'>Repo name</div>
        <div className='header-list-item'>Contributions</div>
        <div className='header-list-item'></div>
      </div>
      <div className='container-context-list'>
        {
          list.map((repo, index) => {
            return (
              <div key={repo.name}>
                <div className='context-list'>
                  <div className='context-list-item'>{index + 1}</div>
                  <div className='context-list-item'>
                    <a 
                      href={repo.url_html} 
                      title={repo.full_name}
                      target="_blank" rel="noreferrer"
                    >
                      {repo.full_name}
                    </a>
                  </div>
                  <div className='context-list-item'>{repo.sharedContributors.length}</div>
                  <div className='context-list-item' onClick={() => showContributions(index+1)}>+</div>
                </div>
                { isContributions === index+1 ?
                  <div>
                    <h3>All Contributors</h3>
                    <ListContributions list={repo.contributions}/>
                  </div> :
                  <></> }
              </div>
            )
          })
        }
      </div>
    </div>
  ) : <></>
}

export default ListRepos;