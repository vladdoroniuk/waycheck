import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS } from 'src/utils/consts';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('ACCESS_TOKEN_SECRET_KEY'),
        signOptions: { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
