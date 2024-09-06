import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@Controller('comment')
export class CommentController {
  constructor() {}

  //   @Post('create')
  //   @UseGuards(CookieGuard)
  //   @UseInterceptors(FilesInterceptor('images'))
  //   async createComment(@Body() body: createCommentDto) {
  // }
}
