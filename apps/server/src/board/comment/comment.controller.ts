import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { CookieGuard } from 'src/auth/cookie.guard';
import { createcommentDto, patchCommentDto } from '../dto/comment.dto';
import { Request, Response } from 'express';
import { AwsService } from 'src/aws/aws.service';
import { CommentService } from './comment.service';
import { cookieInfoDto } from 'src/users/dto/user.dto';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly awsService: AwsService,
  ) {}

  @Post('write')
  @UseGuards(CookieGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async createComment(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request,
    @Body() body: createcommentDto,
    @Res() res: Response,
  ) {
    try {
      const { userinfo } = req.user as cookieInfoDto;

      const imageLink: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const uploadImg = await this.awsService.imageUploadToS3(files[i]);

        imageLink.push(uploadImg);
      }

      body.image = imageLink;

      await this.commentService.createComment(body, userinfo);

      return res.status(200).send();
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  @UseGuards(CookieGuard)
  async deleteComment(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    try {
      const { userinfo } = req.user as cookieInfoDto;

      await this.commentService.deleteComment(id, userinfo);
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id')
  @UseGuards(CookieGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async patchComment(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request,
    @Body() body: any,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    try {
      const { userinfo } = req.user as cookieInfoDto;

      const result = await this.commentService.patchComment(id, userinfo, body);
    } catch (err) {
      throw err;
    }
  }
}
