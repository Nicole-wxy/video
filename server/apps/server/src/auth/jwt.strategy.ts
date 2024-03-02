import { User } from '@libs/db/models/user.model';
import { BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import {StrategyOptions, Strategy, ExtractJwt} from 'passport-jwt'

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User) private userModel:ReturnModelType<typeof User>
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.SECRET
        } as StrategyOptions)
    }
    async validate(id){
        return await this.userModel.findById(id)
    }
}