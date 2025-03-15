import { Module, OnModuleInit } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async onModuleInit() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error(
        'Admin email and password must be set in environment variables',
      );
    }

    const adminExists = await this.userRepository.findOne({
      where: { email, role: UserRole.ADMIN },
    });

    if (!adminExists) {
      this.usersService.create({
        password,
        email,
        role: UserRole.ADMIN,
      });
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  }
}
