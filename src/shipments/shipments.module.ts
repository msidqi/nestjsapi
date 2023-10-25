import { Module } from '@nestjs/common';
import { ShipmentsController } from './shipments.controller';
import { ShipmentsService } from './shipments.service';
import { ExternalApiService } from 'src/external-services/external-api.service';
import { ShipmentTransformationService } from 'src/external-services/shipments-transformation.service';

@Module({
  controllers: [ShipmentsController],
  providers: [
    ShipmentsService,
    ExternalApiService,
    ShipmentTransformationService,
  ],
})
export class ShipmentsModule {}
