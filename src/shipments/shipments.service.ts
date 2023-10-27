import { Injectable } from '@nestjs/common';
// import { plainToInstance } from 'class-transformer';
import { ExternalApiService } from 'src/external-services/external-api.service';
import { ShipmentTransformationService } from 'src/external-services/shipments-transformation.service';
import { Shipment } from 'src/types';
import { GetConsolidationShipmentDTO } from './dto/get-shipments.dto';

@Injectable()
export class ShipmentsService {
  constructor(
    private readonly shipmentTransformationService: ShipmentTransformationService,
    private readonly externalApiService: ExternalApiService,
  ) {}

  async getShipment(
    getShipmentFilters: GetConsolidationShipmentDTO['filters'],
  ): Promise<Shipment[]> {
    console.log(getShipmentFilters);
    const transformedFilters =
      this.shipmentTransformationService.transformFilters(getShipmentFilters);

    const shipmentData =
      await this.externalApiService.fetchShipmentFromExternalApi(
        transformedFilters,
      );

    // plainToInstance(shipmentData.data)
    // @TODO: validate shipmentData
    const transformedData =
      this.shipmentTransformationService.transformShipment(shipmentData);

    console.log('transformedData', transformedData);
    return transformedData;
  }
}
