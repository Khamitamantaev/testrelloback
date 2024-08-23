import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CardsService } from 'src/cards/cards.service';
import { ColumnsService } from 'src/columns/columns.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserCardGuard implements CanActivate {
  constructor(
    private cardService: CardsService,
    private userService: UsersService,
    private columnService: ColumnsService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user
    
    if (!request.params.id) {
      if (request.method === "POST") {
        const column = await this.columnService.findColumnById(parseInt(request.body.columnId))
        const userc = await this.userService.findOne(column.userId)
        if (user.userId !== userc.id) {
          throw new HttpException("dont worry, you cant do this", HttpStatus.FORBIDDEN)
        } else return true
      }
    }

    const card = await this.cardService.findCardById(parseInt(request.params.id))
    const column = await this.columnService.findColumnById(card.columnId)
    const checkUser = await this.userService.findOne(column.userId)
    if (!checkUser) throw new HttpException("Not Found User", HttpStatus.NOT_FOUND)
    switch (request.method) {
      case "DELETE":
        if (user.userId !== checkUser.id) {
          throw new HttpException("dont worry, you cant do this", HttpStatus.FORBIDDEN)
        } else return true
      case "GET":
        if (!checkUser) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        if (user.userId !== checkUser.id) {
          throw new HttpException("dont worry, you cant do this", HttpStatus.FORBIDDEN)
        } else return true
      case "PATCH":
        const newCardColumn = await this.columnService.findColumnById(parseInt(request.body.columnId))
        if (!checkUser) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        if (user.userId !== checkUser.id || column.userId !== newCardColumn.userId) {
          throw new HttpException("dont worry, you cant do this", HttpStatus.FORBIDDEN)
        } else return true
    }
  }
}

