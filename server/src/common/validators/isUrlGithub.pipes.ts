import { BadRequestException } from '@nestjs/common';

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsGitHubUrl(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isGitHubUrl',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsGitHubUrlValidator,
    });
  };
}

@ValidatorConstraint({ name: 'isGithubUrl', async: false })
export class IsGitHubUrlValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const isGitHub = /^https:\/\/github\.com/i.test(value);
    const isCorrectLengthUrlGithub = value?.split('/').length;

    if (!isGitHub || isCorrectLengthUrlGithub !== 5) {
      throw new BadRequestException(
        `The URL "${value}" is not a valid GitHub URL!`,
      );
    }

    return true;
  }
}
