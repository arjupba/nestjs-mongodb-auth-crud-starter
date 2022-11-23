import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ConfigModule } from 'nestjs-config';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AppModule as srcAppModule } from './app/app.module';
import { JwtAuthGuard } from './app/auth/guards/jwt.auth.guard';

dotenv.config();

let devProviders = [];

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV = 'development';
  mongoose.set('debug', true);
  devProviders = [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('tiny'),
    },
  ];
}

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    MongooseModule.forRoot('mongodb://localhost/yt'),
    MorganModule,
    srcAppModule,
  ],
  providers: [
    ...devProviders,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
