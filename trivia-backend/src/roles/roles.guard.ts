import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;
    const request: { user: User } = context.switchToHttp().getRequest();
    const user = request.user;

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        'No tienes permisos para realizar esta acción',
      );
    }

    return true;
  }
}

@Injectable()
export class SelfOrAdminGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userId = request.params.id;

    if (user.role === 'admin') return true;

    if (user.id === userId) return true;

    throw new ForbiddenException(
      'No tienes permisos para realizar esta acción',
    );
  }
}
