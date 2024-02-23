import { ApiProperty } from '@nestjs/swagger';
import { IsGitHubUrl } from 'src/common/validators/isUrlGithub.pipes';

export class ContributionsDTO {
  @ApiProperty()
  @IsGitHubUrl()
  url: string;
}
