import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@apps/auth/auth.controller';
import { AuthService } from '@apps/auth/auth.service';
import { JwtStrategy } from '@apps/auth/strategy/jwt.strategy';
import { LocalStrategy } from '@apps/auth/strategy/local.strategy';
import { UsersModule } from '@apps/users/users.module';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('app.jwtSecret'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
    forwardRef(() => UsersModule),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
