import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from '@apps/auth/auth.module';
import { UsersModule } from '@apps/users/users.module';
import { VegetablesModule } from '@apps/vegetables/vegetables.module';

import { JwtAuthGuard } from '@libs/auth-guards/jwt.auth.guard';

@Module({
  imports: [UsersModule, AuthModule, VegetablesModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
