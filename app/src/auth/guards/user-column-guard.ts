import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ColumnsService } from 'src/columns/columns.service';

@Injectable()
export class UserColumnGuard implements CanActivate {
  constructor(private columnService: ColumnsService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user
    if (!request.params.id) {
      if (request.method === "POST") {
        console.log(user)
        if (user.userId !== request.body.userId) {
          throw new HttpException("dont worry, you cant do this", HttpStatus.FORBIDDEN)
        } else return true
      }
    }
    let column = await this.columnService.findColumnById(parseInt(request.params.id))
    if (!column) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    switch (request.method) {
      case "DELETE":
        if (user.userId !== column.userId) {
          throw new HttpException("dont worry, you cant do this", HttpStatus.FORBIDDEN)
        } else return true
      case "GET":
        if (!column) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        if (user.userId !== column.userId) {
          throw new HttpException("dont worry, you cant do this", HttpStatus.FORBIDDEN)
        } else return true
      case "PATCH":
        if (!column) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        if (user.userId !== column.userId) {
          throw new HttpException("dont worry, you cant do this", HttpStatus.FORBIDDEN)
        } else return true
    }
  }
}