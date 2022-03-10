import { UploaderController } from './uploader.controller';
import { UploaderService } from './uploader.service';
import { Module } from '@nestjs/common';

@Module({providers:[UploaderService],controllers:[UploaderController]})
export class UploaderModule {}
