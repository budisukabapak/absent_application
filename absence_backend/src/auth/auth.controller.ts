import { Controller, Post, Body, HttpCode, Res, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from "express";
import { RegisterDto } from './dto/create.dto';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') 
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() register: RegisterDto): Promise<{message: string}> {
    await this.authService.create(register);

    return { message: 'Admin created successfully' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Res() res: Response, @Body() login: LoginDto): Promise<void> {
    const tokenSet = await this.authService.login(login);

    const expiresAt = new Date(Date.now() + tokenSet.expiresIn * 48);

    res.cookie("access_token", tokenSet.accessToken, { httpOnly: true, sameSite: "strict", path: "/", maxAge: 60 * 60 * 48, expires: expiresAt });
    res.status(200).json(tokenSet);
  }
}
