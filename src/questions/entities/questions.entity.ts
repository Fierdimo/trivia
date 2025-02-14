import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID único de la pregunta',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Categoria a la cual pertenece la pregunta',
    examples: ['economia', 'sistemas', 'ciencias'],
  })
  category: string;

  @Column()
  @ApiProperty({
    description: 'Cuerpo de la pregunta',
    example: '4to planeta más cercano al sol',
  })
  text: string;

  @Column('jsonb')
  @ApiProperty({
    description: 'Distractores de la pregunta',
    examples: ['tierra', 'venus', 'marte', 'saturno'],
  })
  options: string[];

  @Column()
  @ApiProperty({
    description: 'Índice de la opción correcta (0-based)',
  })
  correctAnswer: number;
}
