
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInterface } from './interfaces';
import { LoginUserSchema } from './schemas/login-user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // Do this only if you want to validate the email or password
    });
  }

  async validate(req: Request, email: string, password: string): Promise<UserInterface> {
    // console.log(req.body)
    // Do this if you want to validate the body (email or password) using zod, But just throwing "invalid credentails" could be a good and secure idea while login
    const result = LoginUserSchema.safeParse(req.body);
    if (!result.success) {
      // throw new BadRequestException(result.error.errors);
      throw new UnauthorizedException("Invalid credentails!");
    }

    const user = await this.authService.validateUser(email, password);
    if(!user) {
      throw new UnauthorizedException("Invalid credentails!")
    }
    return user;
  }
}
