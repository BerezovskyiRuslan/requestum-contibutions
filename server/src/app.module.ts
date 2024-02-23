import { Module } from '@nestjs/common';
import { ContributionsModule } from './contributions/contributions.module';

@Module({
  imports: [ContributionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
