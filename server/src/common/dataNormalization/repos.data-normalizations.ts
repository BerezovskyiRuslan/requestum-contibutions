import { filterContributionsByRepo } from '../filters/repos.filter';
import { findRepoByName } from './../helper/helperWithUrl';
import { Contributor } from 'src/types/interfaces/contributors.interface';
import { Repos } from 'src/types/interfaces/repos.interface';

export const mapReposAndContributors = (
  nameRepos: [string],
  contributions: Contributor[][],
  repos: Repos[],
): Repos[] => {
  const reposAndContributors = [];

  contributions.forEach((contribution, index) => {
    const repo = findRepoByName(repos, nameRepos[index]);
    const data = {
      name: repo.name,
      full_name: repo.full_name,
      url_html: repo.html_url,
      contributions: contribution,
    };
    reposAndContributors.push(data);
  });

  return reposAndContributors;
};

export const mapContributorsData = (contributors): Contributor[] => {
  if (!contributors) {
    return [];
  }
  return contributors.map((contributor) => ({
    id: contributor.id,
    login: contributor.login,
    avatar_url: contributor.avatar_url,
    url_html: contributor.html_url,
  }));
};

export const getContributorsRepoOtherRepos = (
  repo: Repos,
  repos: Repos[],
): Repos[] => {
  const reposAndContributors = [];

  repos.forEach((contributorsRepo) => {
    const data = {
      ...contributorsRepo,
      sharedContributors: filterContributionsByRepo(
        repo.contributions,
        contributorsRepo.contributions,
      ),
    };
    reposAndContributors.push(data);
  });

  return reposAndContributors;
};
