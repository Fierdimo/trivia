import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/roles/roles.decorator';
import { Question } from './entities/questions.entity';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener preguntas por categoría' })
  @ApiResponse({
    status: 200,
    description: 'Lista de preguntas',
    type: [Question],
  })
  async getByCategory(@Query('category') category: string) {
    return this.questionsService.findByCategory(category);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Crear nueva pregunta (solo admin)' })
  @ApiBody({ type: Question })
  @ApiResponse({
    status: 201,
    description: 'Pregunta creada',
    type: Question,
  })
  async create(
    @Body() createQuestionDto: Partial<Question>,
  ): Promise<Question> {
    return this.questionsService.create(createQuestionDto);
  }

  @Get('/categories')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener todas las categorías disponibles' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías',
    schema: {
      example: ['react', 'nodejs', 'javascript'],
    },
  })
  async getCategories() {
    return this.questionsService.findAllCategories();
  }
  @Get('/random')
  @ApiOperation({ summary: 'Obtener pregunta aleatoria por categoría' })
  @ApiQuery({ name: 'category', required: true, example: 'react' })
  @ApiResponse({
    status: 200,
    description: 'Pregunta aleatoria',
    type: Question,
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  async getRandomQuestion(
    @Query('category') category: string,
  ): Promise<Question> {
    try {
      return await this.questionsService.getRandomQuestionByCategory(category);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
