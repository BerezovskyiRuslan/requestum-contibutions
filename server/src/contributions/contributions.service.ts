import { Injectable, NotFoundException } from '@nestjs/common';
import {
  getContributionsRepositoryByUrl,
  getRepositoriesOrganizations,
  getRepositoriesUser,
} from 'src/api/github/api-github';
import {
  mapReposAndContributors,
  getContributorsRepoOtherRepos,
} from 'src/common/dataNormalization/repos.data-normalizations';
import { filterReposByNotRepo } from 'src/common/filters/repos.filter';
import {
  getRepositoryName,
  getOwnerRepository,
  getReposName,
  findRepoByName,
} from 'src/common/helper/helperWithUrl';
import { sortReposByLengthContributions } from 'src/common/sorts/repos.sort';
import { Contributor } from 'src/types/interfaces/contributors.interface';
import { Repos } from 'src/types/interfaces/repos.interface';

@Injectable()
export class ContributionsService {
  async getTopContributions(url: string): Promise<Repos[]> {
    const repository: string = getRepositoryName(url);
    const owner: string = getOwnerRepository(url);
    let repositoriesOwner: Repos[] = await getRepositoriesOrganizations(owner);

    if (!repositoriesOwner) {
      repositoriesOwner = await getRepositoriesUser(owner);
    }

    if (!repositoriesOwner) {
      throw new NotFoundException(`The user with name ${owner} not found!`);
    }

    const reposName: [string] = getReposName(repositoriesOwner);

    const isRepositoryByRepositoryOwners: boolean =
      reposName.includes(repository);

    if (!isRepositoryByRepositoryOwners) {
      throw new NotFoundException(`The repository ${repository} not found!`);
    }

    const getAllContributionsRepos: Contributor[][] =
      await this.getContributionsRepos(owner, reposName);

    const mapRepoAndContributions = mapReposAndContributors(
      reposName,
      getAllContributionsRepos,
      repositoriesOwner,
    );

    await Promise.all(mapRepoAndContributions);

    const repoAndContributors: Repos = findRepoByName(
      mapRepoAndContributions,
      repository,
    );

    const reposAndOtherContributors: Repos[] = getContributorsRepoOtherRepos(
      repoAndContributors,
      mapRepoAndContributions,
    );

    const filterRepoAndContributionsNotRepo: Repos[] = filterReposByNotRepo(
      repository,
      reposAndOtherContributors,
    );

    const sortedRepos = sortReposByLengthContributions(
      filterRepoAndContributionsNotRepo,
    );

    return await Promise.all(sortedRepos);
  }

  private async getContributionsRepos(
    owner: string,
    reposName: [string],
  ): Promise<Contributor[][]> {
    const contributionsPromises = reposName.map((name) =>
      getContributionsRepositoryByUrl(owner, name),
    );

    const contributors = await Promise.all(contributionsPromises);

    return contributors;
  }
}
