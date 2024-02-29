import { Get, Controller, UseGuards, Request } from '@nestjs/common';
import { ROUTES } from 'src/utils/routes';
import { AuthGuard } from './guards';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DecodedJwtUser } from './interfaces';

@ApiBearerAuth()
@Controller(ROUTES.auth.root)
export class AuthController {
  @Get(ROUTES.auth.decodeJwt)
  @UseGuards(AuthGuard)
  decodeJwt(@Request() req) {
    const { userAccountId, firstName, lastName, username } = req.user;

    const decodedJwtUser: DecodedJwtUser = {
      userAccountId,
      firstName,
      lastName,
      username,
    };

    return decodedJwtUser;
  }
}
