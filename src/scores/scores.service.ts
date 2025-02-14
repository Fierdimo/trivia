import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Score } from './entities/scores.entity';
import { RankingGateway } from 'src/ranking/ranking.gateway';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    private readonly rankingGateway: RankingGateway,
  ) {}

  async submitScore(user: User, points: number): Promise<Score> {
    const score = this.scoreRepository.create({ user, points });
    const savedScore = await this.scoreRepository.save(score);
    await this.rankingGateway.handleUpdateScore();
    return savedScore;
  }
}
