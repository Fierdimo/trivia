import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/roles/roles.decorator';
import { Question } from './entities/questions.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async getByCategory(@Query('category') category: string) {
    return this.questionsService.findByCategory(category);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(
    @Body() createQuestionDto: Partial<Question>,
  ): Promise<Question> {
    return this.questionsService.create(createQuestionDto);
  }
}
