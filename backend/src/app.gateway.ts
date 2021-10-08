import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors:true})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

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
    console.log(this.users);
  }
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    console.log('hey');
    console.log(client.id);
    console.log(text);
    this.wss.emit('msgToClient', text);
  }

   users = {};
@SubscribeMessage('login')
handleMessage1(client: Socket, text: any): void {
  console.log('hey');
  console.log(client.id);
  console.log(text.userId);
  this.users[client.id] = text.userId;
  console.log(this.users);
  this.wss.emit('connected',this.users[client.id])
    console.log("conected........",this.users[client.id]);
}
}
