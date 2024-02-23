import { Octokit } from '@octokit/rest';
import { mapContributorsData } from 'src/common/dataNormalization/repos.data-normalizations';
import { Contributor } from 'src/types/interfaces/contributors.interface';
import { Repos } from 'src/types/interfaces/repos.interface';
import * as dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
  auth: process.env.TOKERN_GITHUB,
  request: {
    fetch,
  },
});

export const getRepositoriesOrganizations = async (
  owner: string,
): Promise<Repos[]> => {
  return await octokit.rest.repos
    .listForOrg({
      org: owner,
    })
    .then(({ data }) => {
      return data;
    })
    .catch(() => undefined);
};

export const getRepositoriesUser = async (owner: string): Promise<Repos[]> => {
  return await octokit.rest.repos
    .listForUser({
      username: owner,
    })
    .then(({ data }) => {
      return data;
    })
    .catch(() => undefined);
};

export const getContributionsRepositoryByUrl = async (
  owner: string,
  repo: string,
): Promise<Contributor[]> => {
  return await octokit.rest.repos
    .listContributors({ owner, repo })
    .then(({ data }): Contributor[] => {
      return mapContributorsData(data);
    });
};
