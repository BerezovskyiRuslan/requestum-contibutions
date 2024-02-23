import { Repos } from 'src/types/interfaces/repos.interface';

export const getOwnerRepository = (url): string => {
  const urlSplit = url.split('/');
  return urlSplit[urlSplit.length - 2];
};

export const getRepositoryName = (url): string => {
  const urlSplit = url.split('/');
  return urlSplit[urlSplit.length - 1];
};

export const findRepoByName = (repos: Repos[], repoName: string): Repos => {
  return repos.find((repo: Repos) => repoName === repo.name);
};

export const getReposName = (repos) => {
  return repos.map((repo) => repo.name);
};
