import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { AuthCredentialsDto } from '../dtos/AuthCredentialsDto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../interfaces/JwtPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _jtwService: JwtService
  ) {
  }

  public async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this._userRepository.register(authCredentialsDto);
  }

  public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const email: Nullable<string> = await this._userRepository.validatePassword(authCredentialsDto);

    if(email === null) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = {
      email
    };
    const accessToken: string = this._jtwService.sign(payload);

    return {
      accessToken
    };
  }
}
