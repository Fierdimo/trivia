import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async findByCategory(category: string): Promise<Question[]> {
    try {
      const questionsList = await this.questionRepository.find({
        where: { category },
      });
      return questionsList.length > 0 ? questionsList : [];
    } catch {
      throw new NotFoundException('Imposible encontrar datos');
    }
  }

  async create(createQuestionDto: Partial<Question>): Promise<Question> {
    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  async findAllCategories(): Promise<string[]> {
    const categories = await this.questionRepository
      .createQueryBuilder('question')
      .select('DISTINCT(question.category)', 'category')
      .getRawMany();

    return categories.map((c) => c.category);
  }

  async getRandomQuestionByCategory(category: string): Promise<Question> {
    const question = await this.questionRepository
      .createQueryBuilder('question')
      .where('question.category = :category', { category })
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();

    if (!question) {
      throw new NotFoundException(
        `No se encontraron preguntas para la categoría ${category}`,
      );
    }

    return question;
  }
}
