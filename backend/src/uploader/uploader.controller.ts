import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, UploadedFile, UseInterceptors, StreamableFile, Res, Param } from '@nestjs/common';
import { extname, join } from 'path';

@Controller('upload')
export class UploaderController {
    @Post('image')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './public/uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}${extname(file.originalname)}`);
  },
    }),
  }))
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return file.filename
  }

@Get(':id')
display(@Res() res,@Param() image){
    console.log(image.id);
    
    res.sendFile(join(process.cwd(), `/public/uploads/${image.id}`))
}
}
