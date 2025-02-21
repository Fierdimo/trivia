import { Module } from '@nestjs/common';
import { RankingGateway } from './ranking.gateway';
import { RankingService } from './ranking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from 'src/scores/entities/scores.entity';

@Module({
  providers: [RankingGateway, RankingService],
  imports: [TypeOrmModule.forFeature([Score])],
  exports: [RankingGateway],
})
export class RankingModule {}
