import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
import { ColumnsService } from 'src/columns/columns.service';
  
  @Injectable()
  export class UserCardGuard implements CanActivate {
    constructor(private columnService: ColumnsService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      console.log(request.params)
      let column  = await this.columnService.findColumnById(parseInt(request.params.id))
      if(!column) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)

      if(request.user.userId !== column.userId) {
        throw new HttpException("dont worry, you cant do this", HttpStatus.FORBIDDEN)
      } else return true
    }
  }

  // const result = await prisma.user.findFirst({
//     include: {
//       posts: {
//         where: {
//           published: false,
//         },
//         orderBy: {
//           title: 'asc',
//         },
//       },
//     },
//   })