import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './controllers/chat.controller';
import { UserController } from './controllers/user.controller';
import { ChatSchema } from './models/chat.model';
import { UserSchema } from './models/user.model';
import { ChatService } from './services/chat.service';
import { GenerateHashPasswordService } from './services/helper/generate-hash-password.service';
import { UserService } from './services/user.service';

@Module({
    imports:[MongooseModule.forFeature([{name:'User', schema:UserSchema},{name:'Chat', schema:ChatSchema}])],
    controllers: [UserController,ChatController],
    providers: [UserService,GenerateHashPasswordService,ChatService],
})
export class MainModule {}
