import { Test, TestingModule } from '@nestjs/testing';

import { HttpClientModule, HttpClientService } from '@libs/http-client';
import { LoggerModule } from '@libs/logger';

describe('HttpClientService', () => {
  let service: HttpClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpClientModule, LoggerModule.forRoot('http-client')],
    }).compile();

    service = module.get<HttpClientService>(HttpClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
