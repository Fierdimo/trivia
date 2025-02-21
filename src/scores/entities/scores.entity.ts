import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Score {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID único del score',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Usuario que envia la puntuación',
  })
  @ManyToOne(() => User)
  user: User;

  @ApiProperty({
    description: 'cantidad de puntos ganados por la respuesta',
  })
  @Column()
  points: number;

  @ApiProperty({ description: 'Fecha de creación' })
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
