import { prop, modelOptions, DocumentType, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { hashSync } from 'bcryptjs'
import { Course } from './course.model';

export type UserDocument = DocumentType<User>;
//可以定义这个模型的其他属性
@modelOptions({
    schemaOptions: {
        //就会增加创建时间和更新时间两个字段
        timestamps: true
    }
})
//导出用户的类
export class User {
    //定义每一个属性的名字以及示例值
    @ApiProperty({ description: '用户名', example: 'user1' })
    //装饰他的属性
    @prop()
    username: string
    //定义每一个属性的名字以及示例值
    @ApiProperty({ description: '密码', example: 'pass1' })
    @prop({
        select: false,
        get(val) {
            return val;
        },
        set(val){
            //散列密码
            return val ? hashSync(val) : val;
        }
    })
    password: string;
    @arrayProp({ref:'course'})
    liked: Ref<Course>[]
}