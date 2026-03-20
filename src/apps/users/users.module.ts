import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@apps/auth/auth.module';
import { UserEntity, UserSchema } from '@apps/users/entities/user.entity';
import { UsersController } from '@apps/users/users.controller';
import { UsersService } from '@apps/users/users.service';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
})
export class UsersModule {}
