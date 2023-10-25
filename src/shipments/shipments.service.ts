import { Injectable } from '@nestjs/common';
import { ExternalApiService } from 'src/external-services/external-api.service';
import { ShipmentTransformationService } from 'src/external-services/shipments-transformation.service';
import { Shipment } from 'src/types';

@Injectable()
export class ShipmentsService {
  constructor(
    private readonly shipmentTransformationService: ShipmentTransformationService,
    private readonly externalApiService: ExternalApiService,
  ) {}

  async getShipment(): Promise<Shipment[]> {
    const shipmentData =
      await this.externalApiService.fetchShipmentFromExternalApi();

    const transformedData =
      this.shipmentTransformationService.transformShipment(shipmentData);

    console.log('transformedData', transformedData);
    return transformedData;
  }
}
