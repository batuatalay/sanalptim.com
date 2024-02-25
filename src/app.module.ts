import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientPropertiesModule } from './client-properties/client-properties.module';
import { CoachsModule } from './coachs/coachs.module';
import { MovesModule } from './moves/moves.module';
import environment from 'environment';
import { WorkoutsModule } from './workouts/workouts.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    ClientsModule,
    MongooseModule.forRoot(environment.mongoUrl),
    ClientPropertiesModule,
    CoachsModule,
    MovesModule,
    WorkoutsModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
