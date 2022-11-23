import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VegetablesService } from './vegetables.service';
import { VegetablesController } from './vegetables.controller';
import { Vegetable, VegetableSchema } from './entities/vegetable.entity';
import { middleware as query } from 'querymen';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vegetable.name, schema: VegetableSchema },
    ]),
  ],
  controllers: [VegetablesController],
  providers: [VegetablesService],
})
export class VegetablesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(query({}))
      .forRoutes({ path: 'vegetables', method: RequestMethod.GET });
  }
}
