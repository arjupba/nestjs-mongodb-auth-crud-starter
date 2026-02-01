import { Test, TestingModule } from '@nestjs/testing';

import { VegetablesController } from './vegetables.controller';
import { VegetablesService } from './vegetables.service';

describe('VegetablesController', () => {
  let controller: VegetablesController;
  const vegetablesServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VegetablesController],
      providers: [
        {
          provide: VegetablesService,
          useValue: vegetablesServiceMock,
        },
      ],
    }).compile();

    controller = module.get<VegetablesController>(VegetablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
