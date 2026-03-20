import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '@apps/auth/auth.controller';
import { AuthService } from '@apps/auth/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const authServiceMock = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
