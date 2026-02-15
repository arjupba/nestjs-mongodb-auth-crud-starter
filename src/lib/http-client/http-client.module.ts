import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { HttpClientService } from '@libs/http-client';

@Module({
  exports: [HttpClientService],
  imports: [HttpModule],
  providers: [HttpClientService],
})
export class HttpClientModule {}
