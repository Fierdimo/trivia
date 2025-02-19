import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: 200,
    description: 'JWT token generado con vigencia de 1 hora',
    example:
      '{  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGE2MDMwNS0zNmJkLTQ3NDEtYTcyNi04MjAzOGE0MjVkM2UiLCJlbWFpbCI6ImJvYkFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5NTAzMDI3LCJleHAiOjE3Mzk1MDY2Mjd9.DGkri6eHhOhqgKpmoO0cHYYzM8dX1lSGaw5DCgBYXU8"}',
  })
  @ApiResponse({ status: 403, description: 'Credenciales inválidas' })
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    const token = await this.authService.login(user);
    return { ...token, id: user.id };
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 409, description: 'Email ya registrado' })
  async registerUser(@Body() body: RegisterUserDto) {
    const user = await this.userService.create(body);
    const token = await this.authService.login(user);
    return { ...token, id: user.id };
  }
}
