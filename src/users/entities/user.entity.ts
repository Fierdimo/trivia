import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @ApiProperty({
    description: 'ID único del usuario',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Email único del usuario',
    example: 'usuario@ejemplo.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Contraseña encriptada', example: '********' })
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    enum: UserRole,
    description: 'Rol del usuario',
    example: UserRole.USER,
  })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ApiProperty({ description: 'Fecha de creación' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @UpdateDateColumn()
  updatedAt: Date;
}
