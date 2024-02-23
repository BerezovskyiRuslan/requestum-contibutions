import { Controller, Get, Query } from '@nestjs/common';
import { ContributionsDTO } from './dto/contributions.dto';
import { ApiQuery } from '@nestjs/swagger';
import { ContributionsService } from './contributions.service';
import { Repos } from 'src/types/interfaces/repos.interface';

@Controller('contributions')
export class ContributionsController {
  constructor(private readonly contributionsService: ContributionsService) {}

  @ApiQuery({ name: 'url', type: ContributionsDTO })
  @Get('/topContributions')
  async getTopContributions(
    @Query() query: ContributionsDTO,
  ): Promise<Repos[]> {
    return this.contributionsService.getTopContributions(query.url);
  }
}
