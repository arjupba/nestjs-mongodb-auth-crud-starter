import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from '@apps/users/users.controller';
import { UsersService } from '@apps/users/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const usersServiceMock = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
