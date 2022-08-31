import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Endpoint } from './app.model';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Endpoint') private readonly endpointModel: Model<Endpoint>,
  ) {}

  async getEndpointData(endpointToFind: string): Promise<any> {
    const endpoint = await this.findEndpoint(endpointToFind);
    if (endpoint) {
      return {
        expiry_time: endpoint.expiry_time,
        editable: endpoint.editable,
        text_content: endpoint.text_content,
      };
    } else {
      throw new NotFoundException('This link does not exist.');
    }
  }

  async getPassworded(endpointToFind: string): Promise<boolean> {
    const endpoint = await this.findEndpoint(endpointToFind);
    if (endpoint) {
      return endpoint.passworded;
    } else {
      throw new NotFoundException('This link does not exist.');
    }
  }

  async verifyPassword(endpointDto: Endpoint): Promise<boolean> {
    const endpointExists = await this.findEndpoint(endpointDto.endpoint);
    if (endpointExists) {
      return endpointDto.password == endpointExists.password;
    } else {
      throw new NotFoundException('This link does not exist.');
    }
  }

  async generateEndpoint(): Promise<any> {
    const newEndpoint = AppService.generateRandomEndpoint(64, '#aA');
    const endpointExists = await this.findEndpoint(newEndpoint);
    if (endpointExists) {
      await this.generateEndpoint();
    } else {
      return newEndpoint;
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
