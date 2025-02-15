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
    let score = await this.scoreRepository.findOne({ where: { user } });

    if (score) {
      score.points += parseInt(`${points}`);
    } else {
      score = this.scoreRepository.create({ user, points });
    }

    const savedScore = await this.scoreRepository.save(score);
    await this.rankingGateway.handleUpdateScore();
    return savedScore;
  }

  async getGlobalRanking(): Promise<Array<{ email: string; points: number }>> {
    const scores = await this.scoreRepository.find({
      relations: ['user'],
      order: { points: 'DESC' },
    });

    return scores.map((score) => ({
      email: score.user.email,
      points: score.points,
    }));
  }
}
