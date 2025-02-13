import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): string {
    return this.userService.getAll();
  }

  @Get(':id')
  getUser(@Param() param: { id: string }): string {
    return this.userService.getUser(param.id);
  }
}
