import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from './model/client.model';
import { ClientPropertiesModule } from 'src/client-properties/client-properties.module';
import { ClientPropertiesService } from 'src/client-properties/client-properties.service';

@Module({
  imports: [
  MongooseModule.forFeature([{name: "Client", schema: ClientSchema}]),
  ClientPropertiesModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
