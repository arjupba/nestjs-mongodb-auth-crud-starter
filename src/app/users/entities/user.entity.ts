import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords';
import bcrypt from 'bcryptjs';

export type UserDocument = User & Document;
export enum RoleEnum {
  Manager = 'mngr',
  User = 'user',
  Admin = 'admin',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ type: [String], enum: RoleEnum, default: RoleEnum.User })
  roles: string[];

  @Prop({})
  isEnabled: Boolean;

  view: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongooseKeywords, {
  paths: ['email', 'firstName', 'lastName'],
});

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

UserSchema.methods.view = function (full) {
  const view = {
    id: this.id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    avatar: this.avatar,
    roles: this.roles,
    isEnabled: this.isEnabled,
  };

  return full
    ? {
        ...view,
        password: this.password,
      }
    : view;
};
