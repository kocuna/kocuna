import { IsEmail, MinLength, Matches, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8) // eslint-disable-line @typescript-eslint/no-magic-numbers
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/u, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and one number or special character'
  })
  public password: string;
}
