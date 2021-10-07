import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { MainModule } from './main/main.module';
import { AuthMiddleware } from './main/middleware/AuthMIddleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),MongooseModule.forRoot('mongodb://localhost:27017/chat-app'), MainModule],
  controllers: [],
  providers: [AppGateway,ConfigService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'chat/*', method: RequestMethod.ALL });

  }
}