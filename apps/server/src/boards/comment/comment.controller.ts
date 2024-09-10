import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { CookieGuard } from 'src/auth/cookie.guard';
import { createcommentDto } from '../dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor() {}

  //   @Post('create')
  //   @UseGuards(CookieGuard)
  //   @UseInterceptors(FilesInterceptor('images'))
  //   async createComment(@Body() body: createcommentDto) {}
}
