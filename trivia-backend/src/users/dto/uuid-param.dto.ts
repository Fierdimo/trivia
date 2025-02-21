import { IsUUID } from 'class-validator';

export class UuidParamDto {
  @IsUUID('4', { message: 'El ID debe ser un UUID válido' }) // Valida UUID v4
  id: string;
}
