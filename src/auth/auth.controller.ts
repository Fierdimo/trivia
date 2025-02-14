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
  @ApiResponse({ status: 200, description: 'JWT token generado' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    return this.authService.login(user);
  }

  @Post('register')
  registerUser(@Body() body: RegisterUserDto): Promise<User> {
    return this.userService.create(body);
  }
}
