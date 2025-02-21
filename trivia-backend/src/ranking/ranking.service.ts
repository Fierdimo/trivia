import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from 'src/scores/entities/scores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
  ) {}

  async getGlobalRanking() {
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
