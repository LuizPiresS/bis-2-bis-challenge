import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { UniversityAlreadyExistsError } from '../types/university-already-exists.error';

@Injectable()
export class UniversityAlreadyExistsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof UniversityAlreadyExistsError) {
          throw new HttpException(error.message, 400);
        } else {
          throw error;
        }
      }),
    );
  }
}
