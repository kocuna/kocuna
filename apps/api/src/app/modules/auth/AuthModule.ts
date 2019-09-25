import { UserRepository } from './repositories/UserRepository';
import { AuthController } from './controllers/AuthController';
import { AuthService } from './services/AuthService';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './JwtStrategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const eightHoursInSeconds: number = 60 * 60 * 8;

@Module({
  controllers: [
    AuthController
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ],
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: eightHoursInSeconds
      }
    }),
    TypeOrmModule.forFeature([
      UserRepository
    ])
  ],
  providers: [
    AuthService,
    JwtStrategy
  ]
})
export class AuthModule {}
