import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';
import { Action } from './models/action.model';
import { Comment } from './models/comment.model';

//把所有的模型引用进来，再导出出去
const models = TypegooseModule.forFeature([
  User,
  Course,
  Episode,
  Action,
  Comment,
]);
//标记为全局的
@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        };
      },
    }),
    //导入这些模型
    models,
  ],
  providers: [DbService],
  exports: [DbService, models], //再导出这些模型
})
export class DbModule {}
