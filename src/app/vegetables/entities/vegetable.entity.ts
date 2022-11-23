import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords';

export type VegetableDocument = Vegetable & Document;

@Schema({
  timestamps: true,
})
export class Vegetable {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  price: number;

  view: Function;
}

export const VegetableSchema = SchemaFactory.createForClass(Vegetable);

VegetableSchema.plugin(mongooseKeywords, {
  paths: ['name', 'color'],
});

VegetableSchema.methods.view = function (full) {
  const view = {
    id: this.id,
    name: this.name,
    color: this.color,
    price: this.price,
  };

  return full
    ? {
        ...view,
      }
    : view;
};
