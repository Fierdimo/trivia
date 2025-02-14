import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { RolesGuard, SelfOrAdminGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  getUser(@Param() param: { id: string }): Promise<User | null> {
    return this.userService.findOneById(param.id);
  }

  @Post()
  createUser(@Body() body: RegisterUserDto): Promise<User> {
    return this.userService.create(body);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  updateUser(
    @Body() body: Partial<RegisterUserDto>,
    @Param() param: { id: string },
  ): Promise<User> {
    return this.userService.update(param.id, body);
  }
}
