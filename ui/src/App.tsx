import React, { useState } from 'react';
import Input from './components/input/input';
import ListRepos from './components/lists/repos/listRepos';
import { getTopFiveContributions } from './api/api';
import ButtonGo from './components/buttons/buttonGo';
import { validateGithubUrl } from './validation/validation';
import { Repos } from './types/interfaces/repos';

import './App.css';
import ErrorMessage from './components/errors/error';
import Loading from './components/loading/loading';

function App() {
  const [urlGitHub, setUrlGitHub] = useState('');
  const [errorUrl, setErrorUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [topContributionList, setTopContributionList] = useState<Repos[]>([]);

  const onClickSearch = async () => {
    const isError = validateGithubUrl(urlGitHub);

    if(!isError) {
      setErrorUrl('This url is not valid!');
      return;
    }

    setErrorUrl('');

    setIsLoading(true);
    setTopContributionList([]);
    setErrorMessage('');
    const data = await getTopFiveContributions(urlGitHub)
      .then((data) => {
        if(data.error) {
          setErrorMessage(data.message || '');
          return [];
        }
        return data
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (Array.isArray(data)) {
      setTopContributionList(data);
    }
  }
  
  
  return (
    <div className="App">
      <h1>Top 5 repositories with the most common contributors.</h1>
      <Input value={urlGitHub} setValue={setUrlGitHub} error={errorUrl}/>
      <ButtonGo value={'Go'} onClick={onClickSearch} />
      <p>{urlGitHub}</p>
      <Loading isLoading={isLoading}/>
      <ListRepos list={topContributionList} /> 
      <ErrorMessage message={errorMessage} />
    </div>
  );
}

export default App;
