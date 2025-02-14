import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RankingService } from './ranking.service';

@WebSocketGateway({ cors: true })
export class RankingGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly rankingService: RankingService) {}

  @SubscribeMessage('updateScore')
  async handleUpdateScore() {
    const ranking = await this.rankingService.getGlobalRanking();
    this.server.emit('rankingUpdated', ranking);
  }
}
