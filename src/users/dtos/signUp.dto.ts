import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { SignUp } from '../interfaces';

const SignUpSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    password: z.string(),
  })
  .required() satisfies z.ZodType<SignUp>;

export class SignUpDto extends createZodDto(SignUpSchema) {}
