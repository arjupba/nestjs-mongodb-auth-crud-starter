import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

import { ObjectLiteral } from '@libs/golbal';

export function ContainCapitalLetter(validationOptions?: ValidationOptions) {
  return function (object: ObjectLiteral, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: 'ContainCapitalLetter',
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should contain atleast one capital letter`;
        },
        validate(value: any, _: ValidationArguments) {
          return /[A-Z]/.test(value);
        },
      },
    });
  };
}

export function ContainSmallLetter(validationOptions?: ValidationOptions) {
  return function (object: ObjectLiteral, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: 'ContainSmallLetter',
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should contain atleast one small letter`;
        },
        validate(value: any, _: ValidationArguments) {
          return /[a-z]/.test(value);
        },
      },
    });
  };
}

export function ContainNumber(validationOptions?: ValidationOptions) {
  return function (object: ObjectLiteral, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: 'ContainNumber',
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should contain atleast one number`;
        },
        validate(value: any, _: ValidationArguments) {
          return /[0-9]/.test(value);
        },
      },
    });
  };
}

export function ContainSymbol(validationOptions?: ValidationOptions) {
  return function (object: ObjectLiteral, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: 'ContainSymbol',
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: {
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should contain atleast one special character`;
        },
        validate(value: any, _: ValidationArguments) {
          return /[^a-zA-Z0-9]/.test(value);
        },
      },
    });
  };
}
