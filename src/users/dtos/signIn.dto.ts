import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { SignIn } from '../interfaces';

const SignInSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .required() satisfies z.ZodType<SignIn>;

export class SignInDto extends createZodDto(SignInSchema) {}
