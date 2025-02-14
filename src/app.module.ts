import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { Question } from './questions/entities/questions.entity';

const DB_PORT = process.env.DB_PORT || 5432;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Question],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    QuestionsModule,
  ],
})
export class AppModule {}
