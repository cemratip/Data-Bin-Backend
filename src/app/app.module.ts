import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { EndpointSchema } from './app.model';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECT),
    MongooseModule.forFeature([{ name: 'Endpoint', schema: EndpointSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
