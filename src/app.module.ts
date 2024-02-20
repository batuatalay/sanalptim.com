import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientPropertiesModule } from './client-properties/client-properties.module';
import { CoachsModule } from './coachs/coachs.module';
import { MovesModule } from './moves/moves.module';
import environment from 'environment';

@Module({
  imports: [
    ClientsModule,
    MongooseModule.forRoot(environment.mongoUrl),
    ClientPropertiesModule,
    CoachsModule,
    MovesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
