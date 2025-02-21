import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { RolesGuard, SelfOrAdminGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UuidParamDto } from './dto/uuid-param.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Muestra una lista de todos los usuarios. Solo para ADMIN',
  })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  @ApiResponse({
    status: 401,
    description: 'No tienes permisos para realizar esta acción',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  @ApiOperation({
    summary:
      'Muestra una todos los datos del usuario. Solo para ADMIN y el propio usuario',
  })
  @ApiParam({
    name: 'id',
    description: 'uuid del usuario',
    example: 'http://localhost:3000/users/b920878d-6384-4217-93ba-489fe9284669',
  })
  @ApiResponse({ status: 200, description: 'Datos del usuario' })
  @ApiResponse({
    status: 401,
    description: 'No tienes permisos para realizar esta acción',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  async getUser(@Param() params: UuidParamDto): Promise<User | null> {
    return await this.userService.findOneById(params.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  @ApiOperation({
    summary:
      'Modifica los datos del usuario. Solo para ADMIN y el propio usuario',
  })
  @ApiParam({
    name: 'id',
    description: 'uuid del usuario',
    example: 'http://localhost:3000/users/b920878d-6384-4217-93ba-489fe9284669',
  })
  @ApiResponse({ status: 200, description: 'Datos del usuario' })
  @ApiResponse({
    status: 401,
    description: 'No tienes permisos para realizar esta acción',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  updateUser(
    @Body() body: Partial<RegisterUserDto>,
    @Param() params: UuidParamDto,
  ): Promise<User> {
    return this.userService.update(params.id, body);
  }
}
