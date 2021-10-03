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
    this.logger.log(`Client connected :  ${client.id}`)
  }

  handleDisconnect(client: Socket){
    this.logger.log(`Client disconnected :  ${client.id}`)
  }
  
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    console.log(text)
    this.wss.emit('msgToClient', text);
  }
}
