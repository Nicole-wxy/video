import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('upload')
  //拦截器
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file){
    return file
    // return {
    //   url:`http://localhost:3000/uploads/${file.filename}`
    // }
  }
}
