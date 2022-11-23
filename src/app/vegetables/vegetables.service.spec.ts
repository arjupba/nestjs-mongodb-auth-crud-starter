import { Test, TestingModule } from '@nestjs/testing';
import { VegetablesService } from './vegetables.service';

describe('VegetablesService', () => {
  let service: VegetablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VegetablesService],
    }).compile();

    service = module.get<VegetablesService>(VegetablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
