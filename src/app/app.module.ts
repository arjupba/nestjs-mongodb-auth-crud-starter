import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VegetablesModule } from './vegetables/vegetables.module';

@Module({
  imports: [UsersModule, AuthModule, VegetablesModule],
})
export class AppModule {}
