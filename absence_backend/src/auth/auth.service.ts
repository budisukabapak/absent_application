import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/create.dto';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { TokenSet } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository
  ) {}

  async create(createAuthDto: RegisterDto): Promise<void> {
    const { first_name, last_name, email, birth_date, gender, password } = createAuthDto;

    try {
      const hashed_password = await bcrypt.hash(password, 10)

      // Create and save the admin
      await this.authRepository.createAdmin({
        first_name,
        last_name,
        email,
        birth_date,
        gender,
        hashed_password,
      });

    } catch (err) {
      throw new Error(err);
    }
  }

  async login(loginDto: LoginDto): Promise<TokenSet> {
    // check if the email is on the database
    const isEmailValidated = await this.authRepository.findByEmail(loginDto.email);

    if (!isEmailValidated) {
      throw new Error('Email not found');
    }

    // check if the password is correct
    const isPasswordValidated = await bcrypt.compare(loginDto.password, isEmailValidated.hashed_password);

    if (!isPasswordValidated) {
      throw new Error('Password is incorrect');
    }

    const accessToken = await this.authRepository.createToken(loginDto);

    return accessToken;
  }
}
