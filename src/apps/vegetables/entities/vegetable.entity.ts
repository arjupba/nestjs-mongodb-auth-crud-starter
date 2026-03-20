import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VegetableDocument = HydratedDocument<VegetableEntity>;
@Schema({
  collection: 'vegetables',
  timestamps: true,
})
export class VegetableEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;

  view: Function;
}

export const VegetableSchema = SchemaFactory.createForClass(VegetableEntity);

VegetableSchema.methods.view = function (full: boolean = false) {
  const view = {
    color: this.color,
    id: this.id,
    name: this.name,
  };

  return full
    ? {
        ...view,
      }
    : view;
};
