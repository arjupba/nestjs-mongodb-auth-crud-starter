import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { blockedEmails } from './blockEmailList';

export function ContainCapitalLetter(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ContainCapitalLetter',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return /[A-Z]/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should contain atleast one capital letter`;
        },
      },
    });
  };
}

export function ContainSmallLetter(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ContainSmallLetter',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return /[a-z]/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should contain atleast one small letter`;
        },
      },
    });
  };
}

export function ContainNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ContainNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return /[0-9]/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should contain atleast one number`;
        },
      },
    });
  };
}

export function ContainSymbol(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ContainSymbol',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return /[^a-zA-Z0-9]/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should contain atleast one special character`;
        },
      },
    });
  };
}

export function IsNotFreeEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotFreeEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          let blockEmail = false;
          blockedEmails.forEach((element) => {
            const regex = new RegExp(`${element}$`);

            if (value.match(regex)) {
              blockEmail = true;
              return false;
            }
          });

          return !blockEmail;
        },
        defaultMessage(args: ValidationArguments) {
          return `Unsupported ${args.property}. ${args.value}`;
        },
      },
    });
  };
}
