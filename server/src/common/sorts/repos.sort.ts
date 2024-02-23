import { Repos } from 'src/types/interfaces/repos.interface';

export const sortReposByLengthContributions = (repos: Repos[]): Repos[] => {
  let reposArray: Repos[] = repos.sort(
    (repoA: Repos, repoB: Repos) =>
      repoB.contributions.length - repoA.contributions.length,
  );

  reposArray = reposArray.splice(0, 5);

  return reposArray;
};
