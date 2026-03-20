import { DynamicModule, Module } from '@nestjs/common';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

@Module({})
export class LoggerModule {
  static forRoot(appName: string): DynamicModule {
    return {
      exports: [WinstonModule],
      imports: [
        WinstonModule.forRoot({
          level: process.env.LOG_LEVEL || 'info',
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                nestWinstonModuleUtilities.format.nestLike(appName, {
                  colors: true,
                  prettyPrint: true,
                }),
              ),
            }),
          ],
        }),
      ],
      module: LoggerModule,
    };
  }
}
