import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { HttpClientService } from '@libs/http-client';
import { LoggerModule } from '@libs/logger';

@Module({
  exports: [HttpClientService],
  imports: [HttpModule, LoggerModule.forRoot('http-client')],
  providers: [HttpClientService],
})
export class HttpClientModule {}
