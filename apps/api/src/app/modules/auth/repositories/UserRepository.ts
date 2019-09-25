import * as bcrypt from 'bcrypt';

import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from '../../../entities/UserEntity';
import { AuthCredentialsDto } from '../dtos/AuthCredentialsDto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;
    const salt: string = await bcrypt.genSalt();
    const userEntity: UserEntity = new UserEntity();

    userEntity.email = email;
    userEntity.salt = salt;
    userEntity.password = await this._hashPassword(password, salt);

    try {
      await userEntity.save();
    } catch(error) {
      const duplicateEntry: string = '23505';

      if(error.code === duplicateEntry) {
        throw new ConflictException('user already exists.');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  public async validatePassword(authCredentialsDto: AuthCredentialsDto): Promise<Nullable<string>> {
    const { email, password } = authCredentialsDto;
    const userEntity: Undefinable<UserEntity> = await this.findOne({
      email
    });

    if(userEntity && await this._validatePasswordAgainstEntity(userEntity, password)) {
      return userEntity.email;
    }

    return null;
  }

  private async _hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private async _validatePasswordAgainstEntity(userEntity: UserEntity, givenPassword: string): Promise<boolean> {
    const givenPasswordHashed: string = await bcrypt.hash(givenPassword, userEntity.salt);
    const actualHashedPassword: string = userEntity.password;

    return givenPasswordHashed === actualHashedPassword;
  }
}
