import { Module } from '@nestjs/common';
import { ClientPropertiesService } from './client-properties.service';
import { ClientPropertiesController } from './client-properties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientPropertySchema } from './model/client-properties.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: "ClientProperty", schema: ClientPropertySchema}]),
  ],
  controllers: [ClientPropertiesController],
  providers: [ClientPropertiesService],
  exports : [ClientPropertiesService],
})
export class ClientPropertiesModule {}
