import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
  import { CardsService } from 'src/cards/cards.service';
  import { ColumnsService } from 'src/columns/columns.service';
import { CommentsService } from 'src/comments/comments.service';
  import { UsersService } from 'src/users/users.service';
  
  @Injectable()
  export class UserCommentGuard implements CanActivate {
    constructor(
      private cardService: CardsService,
      private userService: UsersService,
      private columnService: ColumnsService,
      private commentService: CommentsService
    ) { }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user
      
      if (!request.params.id) {
        if (request.method === "POST") {
          const column = await this.columnService.findColumnById(request.body.columnId)
          const userc = await this.userService.findOne(column.userId)
          if (user.userId !== userc.id) {
            throw new HttpException("dont worry, you cant do this", HttpStatus.FORBIDDEN)
          } else return true
        }
      }
      const comment = await this.commentService.findCommentById(parseInt(request.params.id))
      const card = await this.cardService.findCardById(comment.cardId)
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
          if (!checkUser) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
          if (user.userId !== checkUser.id) {
            throw new HttpException("dont worry, you cant do this", HttpStatus.FORBIDDEN)
          } else return true
      }
    }
  }
  
  