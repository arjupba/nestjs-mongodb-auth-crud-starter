import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppModule as srcAppModule } from 'src/app/app.module';
import appConfig from 'src/config/app';

import { LoggerModule } from '@libs/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      expandVariables: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      isGlobal: true,
      load: [appConfig],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/test'),
    srcAppModule,
    LoggerModule.forRoot('NestJS App'),
  ],
})
export class AppModule {}
