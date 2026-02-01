import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from '@apps/auth/auth.module';
import { JwtAuthGuard } from '@apps/auth/guards/jwt.auth.guard';
import { UsersModule } from '@apps/users/users.module';
import { VegetablesModule } from '@apps/vegetables/vegetables.module';

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
