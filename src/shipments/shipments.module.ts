import { Module } from '@nestjs/common';
import { ShipmentsController } from '../shipments/shipments.controller';
import { ShipmentsService } from '../shipments/shipments.service';
import { ExternalApiService } from '../external-services/external-api.service';
import { ShipmentTransformationService } from '../external-services/shipments-transformation.service';

@Module({
  controllers: [ShipmentsController],
  providers: [
    ShipmentsService,
    ExternalApiService,
    ShipmentTransformationService,
  ],
})
export class ShipmentsModule {}
