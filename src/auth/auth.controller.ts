
import {
    Body,
    Controller,
    Get,
    HttpException,
    NotFoundException,
    Post,
    Request,
    UseGuards,
    UsePipes
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestInterface } from './interfaces/request.interface';
import { ZodValidationPipe } from 'src/common/pipes/zod-valdation.pipe';
import { LoginUserSchema, LoginUserType } from './schemas/login-user.schema';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: RequestInterface) {
        // console.log(_body);
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: RequestInterface) {
        return req.user;
    }


    // @UseGuards(LocalAuthGuard)
    // @Post('logout')
    // async logout(@Request() req: RequestInterface) {
    //     return req.logOut((err) => {
    //         console.log(err);
    //     });
    // }
}
