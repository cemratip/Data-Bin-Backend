import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Endpoint } from './app.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':endpoint')
  getEndpoint(@Param() endpointDto: Endpoint): Promise<any> {
    return this.appService.getEndpointData(endpointDto.endpoint);
  }

  @Get(':endpoint/locked')
  getPassworded(@Param() endpointDto: Endpoint): Promise<boolean> {
    return this.appService.getPassworded(endpointDto.endpoint);
  }

  @Get()
  generateEndpoint(): Promise<any> {
    return this.appService.generateEndpoint();
  }

  @Post()
  createEndpoint(@Body() endpointDto: Endpoint) {
    return this.appService.writeToEndpoint(endpointDto);
  }

  @Post('/verify')
  verifyPassword(@Body() endpointDto: Endpoint): Promise<boolean> {
    return this.appService.verifyPassword(endpointDto);
  }

  // TODO: BACKEND - STORE EXPIRY_DATETIME INSTEAD OF E.G. '1h'
  // TODO: MAKE RECORDS SELF DESTRUCT WHEN EXPIRY TIME REACHED
  // TODO: ENCRYPT PASSWORDS
}
