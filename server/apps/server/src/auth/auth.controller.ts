import { User, UserDocument } from '@libs/db/models/user.model';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {JwtService} from'@nestjs/jwt'
import { CurrentUser } from './current-user.decorator';
@Controller('auth')
@ApiTags('用户')
export class AuthController {
    constructor(
        private jwtService:JwtService,
        @InjectModel(User) private useModel:ReturnModelType<typeof User>
    ){}
    //注册接口
    @Post('register')
    @ApiOperation({summary:'注册'})
    async register(@Body() dto:RegisterDto){
        const {username,password} = dto;
        const user = await this.useModel.create({
            username,
            password
        })
        return user;
    }
    //登录
    @Post('login')
    @ApiOperation({summary:'登录'})
    @UseGuards(AuthGuard('local'))
    async login(@Body() dto:LoginDto, @CurrentUser() user:UserDocument){
        return {
            token: this.jwtService.sign(String(user._id))
        };
    }
    //查看个人信息
    @Get('user')
    @ApiOperation({summary:'获取个人信息'})
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async user(@CurrentUser() user: UserDocument){
        return user;
    }
}
