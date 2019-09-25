import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDto } from '../dtos/AuthCredentialsDto';
import { AuthService } from '../services/AuthService';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService
  ) {
  }

  @Post('/register')
  @UsePipes(ValidationPipe)
  public async register(
    @Body() authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    return this._authService.register(authCredentialsDto);
  }

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto
  ): Promise<{accessToken: string}> {
    return this._authService.signIn(authCredentialsDto);
  }
}
