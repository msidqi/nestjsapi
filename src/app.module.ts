import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ShipmentsModule } from './shipments/shipments.module';

@Module({
  imports: [ShipmentsModule],
  controllers: [AppController],
})
export class AppModule {}
