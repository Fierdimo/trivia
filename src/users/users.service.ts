import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getAll(): string {
    return 'Todos los usuarios!';
  }

  getUser(id: string): string {
    return 'usuario en particular id: ' + id;
  }

  createUser(): string {
    return 'crear usuario';
  }

  removeUser(): string {
    return 'borrar usuario';
  }

  updateUser(): string {
    return 'actualiza usuario';
  }
}
