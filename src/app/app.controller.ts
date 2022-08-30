import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Endpoint } from './app.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':endpoint')
  getEndpoint(@Param() endpointDto: Endpoint): Promise<any> {
    return this.appService.getEndpointData(endpointDto.endpoint);
  }

  @Get()
  generateEndpoint(): Promise<any> {
    return this.appService.generateEndpoint();
  }

  @Post()
  createEndpoint(@Body() endpointDto: Endpoint) {
    console.log(endpointDto);
    return this.appService.writeToEndpoint(endpointDto);
  }
}
