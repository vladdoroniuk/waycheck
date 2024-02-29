import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInDto, SignUpDto } from './dtos';
import { ROUTES } from '../../src/utils/routes';

@Controller(ROUTES.users.root)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(ROUTES.users.signIn)
  signIn(@Body() signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }

  @Post(ROUTES.users.signUp)
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.usersService.signUp(signUpDto);
  }
}
