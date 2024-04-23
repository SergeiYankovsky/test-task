import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller({
  version: '1',
})
@ApiTags('ping')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('ping')
  @ApiOkResponse({ description: 'Return "pong" if server is running' })
  ping(): string {
    return this.appService.ping();
  }
}
