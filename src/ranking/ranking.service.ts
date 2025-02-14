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

  async getGlobalRanking(): Promise<Score[]> {
    return this.scoreRepository.find({
      relations: ['user'],
      order: { points: 'DESC' },
    });
  }
}
