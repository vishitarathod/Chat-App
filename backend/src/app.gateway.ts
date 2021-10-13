import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './main/services/chat.service';

@WebSocketGateway({cors:true})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  constructor(
    private readonly chatService: ChatService
  ) {
  }
  @WebSocketServer() wss: Server;

  private logger: Logger=new Logger('AppGateway');
  
  afterInit(server: Server){
    console.log('initialize');
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]){
    // console.log(client);
    this.logger.log(`Client connected :  ${client.id}`)
    // console.log(this.users[client.id]);
  }
  handleDisconnect(client: Socket){
    this.logger.log(`Client disconnected :  ${client.id}`)
    // console.log(this.users[client.id]);
    this.wss.emit('disconnected', this.users[client.id]);
    delete this.users[client.id];
    // console.log(this.users);
  }
  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, text: any): Promise<any> {
    // console.log('hey');
    // console.log(client.id);
   const savedMessage= await this.chatService.saveMessage(text)
  //  await this.chatService.updateNotificationCount(text)
    console.log("((((((((((",text);
    // this.wss.to([`${text.receiverId}`,`${text.id}`]).emit('msgToClient', text);
    this.wss.emit('msgToClient', text);
    // client.emit('msgToClient', text)
    this.wss.emit('notification', text.senderId);
  }

  users = {};
  @SubscribeMessage('login')
  handleMessage1(client: Socket, text: any): void {
    // console.log('hey');
    // console.log(client.id);
    // console.log(text.userId);
    this.users[client.id] = text.userId;
    console.log(this.users);
    this.wss.emit('connected',this.users[client.id])
    console.log(this.users);
  
      // console.log("conected........",this.users[client.id]);
  }
 
}
