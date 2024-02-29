import { Body, Controller, Post } from '@nestjs/common';
import { ROUTES } from 'src/utils/routes';

@Controller(ROUTES.auth.root)
export class AuthController {
  @Post(ROUTES.auth.decodeJwt)
  decodeJwt(@Body() decodeJwtDto) {
    return;
  }
}
