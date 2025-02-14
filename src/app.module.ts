import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { Question } from './questions/entities/questions.entity';
import { Score } from './scores/entities/scores.entity';
import { RankingModule } from './ranking/ranking.module';
import { ScoresModule } from './scores/scores.module';

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
      entities: [User, Question, Score],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    QuestionsModule,
    ScoresModule,
    RankingModule,
  ],
})
export class AppModule {}
