import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { UserEntity } from '@apps/users/entities/user.entity';
import { UsersService } from '@apps/users/users.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockUserModel = {
    create: jest.fn(),
    deleteOne: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(UserEntity.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
