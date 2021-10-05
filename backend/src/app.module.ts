import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { MainModule } from './main/main.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/chat-app'), MainModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}

