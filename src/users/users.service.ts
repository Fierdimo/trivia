import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /** Obtiene todos los usuarios (solo para administradores) */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /** Busca un usuario por email */
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  /** Crea un nuevo usuario con contraseña encriptada */
  async create(createUserDto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser)
      throw new ConflictException('El email ya está registrado');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  /** Actualiza un usuario por ID */
  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const isPassword = updateUserDto.password;
    const password = isPassword
      ? await bcrypt.hash(isPassword, 10)
      : user.password;

    updateUserDto.password = password;
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  /** Elimina un usuario por ID */
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
