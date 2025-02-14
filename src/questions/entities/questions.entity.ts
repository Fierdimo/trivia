import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category: string;

  @Column()
  text: string;

  @Column('jsonb')
  options: string[];

  @Column()
  correctAnswer: number; // Índice de la opción correcta (0-based)
}
