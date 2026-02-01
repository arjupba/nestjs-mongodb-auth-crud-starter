import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { VegetableEntity } from '@apps/vegetables/entities/vegetable.entity';
import { VegetablesService } from '@apps/vegetables/vegetables.service';

describe('VegetablesService', () => {
  let service: VegetablesService;
  const mockVegetableModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VegetablesService,
        {
          provide: getModelToken(VegetableEntity.name),
          useValue: mockVegetableModel,
        },
      ],
    }).compile();

    service = module.get<VegetablesService>(VegetablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
