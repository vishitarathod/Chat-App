import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './controllers/chat.controller';
import { UserController } from './controllers/user.controller';
import { ChatSchema } from './models/chat.model';
import { UserSchema } from './models/user.model';
import { ChatService } from './services/chat.service';
import { AuthenticationService } from './services/helper/authentication.service';
import { GenerateHashPasswordService } from './services/helper/generate-hash-password.service';
import { UserService } from './services/user.service';

@Module({
    imports:[ JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async () => ({}),
      }),MongooseModule.forFeature([{name:'User', schema:UserSchema},{name:'Chat', schema:ChatSchema}])],
    controllers: [UserController,ChatController],
    providers: [UserService,GenerateHashPasswordService,ChatService,AuthenticationService],
    exports: [AuthenticationService],
})
export class MainModule {}
