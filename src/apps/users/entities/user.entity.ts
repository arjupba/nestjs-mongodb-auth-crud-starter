import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import bcrypt from 'bcryptjs';
import { HydratedDocument } from 'mongoose';

import { RoleEnum } from '@apps/users/domain/user.type';

export type UserDocument = HydratedDocument<UserEntity>;
@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserEntity {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({
    default: RoleEnum.User,
    enum: RoleEnum,
    type: [String],
  })
  roles: string[];

  @Prop({ default: false })
  isEnabled: Boolean;

  view: Function;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.pre('save', async function (next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;

      next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
});

UserSchema.methods.view = function (full: boolean = false) {
  const view = {
    avatar: this.avatar,
    email: this.email,
    firstName: this.firstName,
    id: this.id,
    isEnabled: this.isEnabled,
    lastName: this.lastName,
    roles: this.roles,
  };

  return full
    ? {
        ...view,
        password: this.password,
      }
    : view;
};
