import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ScoresService } from './scores.service';
import { User } from 'src/users/entities/user.entity';
import { Score } from './entities/scores.entity';

@ApiTags('Scores')
@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Enviar puntaje del usuario' })
  @ApiBody({
    schema: {
      example: { points: 100 },
      description: 'Puntos obtenidos por el usuario',
    },
  })
  @ApiResponse({ status: 201, description: 'Puntaje registrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async submitScore(@Body('points') points: number, @Req() req) {
    const user = req.user as User;
    await this.scoresService.submitScore(user, points);
  }
}
