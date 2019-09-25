import { UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { UserEntity } from '../entities/UserEntity';

/* eslint-disable id-blacklist, @typescript-eslint/no-explicit-any*/
export const GetSessionUser: (data?: any, request?: any) => ParameterDecorator
  = createParamDecorator((data: any, request: any): UserEntity => {
    if(!request.user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return request.user;
  });
/* eslint-enable id-blacklist, @typescript-eslint/no-explicit-any*/
