import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Endpoint } from './app.model';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Endpoint') private readonly endpointModel: Model<Endpoint>,
  ) {}

  async getEndpointData(endpointToFind: string): Promise<Endpoint> {
    const endpoint = await this.findEndpoint(endpointToFind);
    if (endpoint) {
      return endpoint;
    } else {
      throw new NotFoundException('This link does not exist.');
    }
  }

  async generateEndpoint(): Promise<any> {
    const newEndpoint = AppService.generateRandomEndpoint(64, '#aA');
    console.log(newEndpoint);
    const endpointExists = await this.findEndpoint(newEndpoint);
    if (endpointExists) {
      await this.generateEndpoint();
    } else {
      return 'https://data-bin.herkuapp.com/' + newEndpoint;
    }
  }

  async writeToEndpoint(endpointDto: Endpoint) {
    const endpointExists = await this.findEndpoint(endpointDto.endpoint);
    if (endpointExists) {
      await this.editEndpoint(endpointDto);
    } else {
      await this.createEndpoint(endpointDto);
    }
  }

  private async createEndpoint(endpointDto: Endpoint) {
    const newEndpoint = new this.endpointModel(endpointDto);
    await newEndpoint.save();
  }

  private async editEndpoint(endpointDto: Endpoint) {
    await this.endpointModel
      .updateOne({ endpoint: endpointDto.endpoint }, endpointDto)
      .exec();
  }

  private async findEndpoint(newEndpoint: string): Promise<Endpoint> {
    return await this.endpointModel.findOne({ endpoint: newEndpoint }).exec();
  }

  private static generateRandomEndpoint(length, chars): string {
    let mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    let result = '';
    for (let i = length; i > 0; --i)
      result += mask[Math.floor(Math.random() * mask.length)];
    return result;
  }
}
