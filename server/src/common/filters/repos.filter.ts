import { Contributor } from 'src/types/interfaces/contributors.interface';
import { Repos } from 'src/types/interfaces/repos.interface';

export const filterContributionsByRepo = (
  contributions: Contributor[],
  contributionsRepo: Contributor[],
): Contributor[] => {
  return contributions.filter((contribution) => {
    return contributionsRepo.filter(
      (contributionRepo) => contributionRepo.login === contribution.login,
    ).length;
  });
};

export const filterReposByNotRepo = (
  repoName: string,
  repos: Repos[],
): Repos[] => {
  return [...repos].filter((value) => value.name !== repoName);
};
