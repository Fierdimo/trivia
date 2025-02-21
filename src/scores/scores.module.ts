import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { Score } from './entities/scores.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingModule } from 'src/ranking/ranking.module';

@Module({
  providers: [ScoresService],
  controllers: [ScoresController],
  imports: [TypeOrmModule.forFeature([Score]), RankingModule],
})
export class ScoresModule {}
