import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserRepository } from './repositories/UserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './interfaces/JwtPayload';
import { PassportStrategy } from '@nestjs/passport';
import { UserEntity } from '../../entities/UserEntity';

// PassportStrategy(Strategy);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51'
    });
  }

  public async validate(payload: JwtPayload): Promise<UserEntity> {
    const { email } = payload;
    const userEntity: Undefinable<UserEntity> = await this._userRepository.findOne({
      email
    });

    if(userEntity === undefined) {
      throw new UnauthorizedException();
    }

    return userEntity;
  }
}
