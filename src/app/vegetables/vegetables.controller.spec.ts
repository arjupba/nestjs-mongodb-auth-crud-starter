import { Test, TestingModule } from '@nestjs/testing';
import { VegetablesController } from './vegetables.controller';
import { VegetablesService } from './vegetables.service';

describe('VegetablesController', () => {
  let controller: VegetablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VegetablesController],
      providers: [VegetablesService],
    }).compile();

    controller = module.get<VegetablesController>(VegetablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
