import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { type } from 'os';
import { User } from './user.model';
import { Course } from './course.model';
import { Episode } from './episode.model';

//可以定义这个模型的其他属性
@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
//导出用户的类
export class Action {
    @prop({ref:'user'})
    user:Ref<User>

    @prop({enum:['Course','Episode']})
    type:string

    @prop({refPath:'type'})
    object:Ref<Course|Episode>

    @prop({enum:['like','upVote']})
    name:string
}