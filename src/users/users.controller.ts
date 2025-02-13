import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param() param: { id: string }): Promise<User | null> {
    return this.userService.findOneById(param.id);
  }

  @Post()
  createUser(@Body() body: RegisterUserDto): Promise<User> {
    return this.userService.create(body);
  }
}
