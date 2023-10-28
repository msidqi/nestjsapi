import { HttpException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ExternalApiService } from '../external-services/external-api.service';
import { ShipmentTransformationService } from '../external-services/shipments-transformation.service';
import { Shipment } from '../types';
import {
  GetConsolidationShipmentDTO,
  GetExternalShipmentDTO,
} from '../shipments/dto/get-shipments.dto';

@Injectable()
export class ShipmentsService {
  constructor(
    private readonly shipmentTransformationService: ShipmentTransformationService,
    private readonly externalApiService: ExternalApiService,
  ) {}

  async getShipment(
    getShipmentFilters: GetConsolidationShipmentDTO['filters'],
  ): Promise<Shipment[]> {
    const transformedFilters =
      this.shipmentTransformationService.transformFilters(getShipmentFilters);

    const shipmentData =
      await this.externalApiService.fetchShipmentFromExternalApi(
        transformedFilters,
      );

    // validate external api data
    const responseData = plainToInstance(GetExternalShipmentDTO, shipmentData);

    try {
      await validateOrReject(responseData);
    } catch (e) {
      // invalid remote api response
      throw new HttpException('Internal Server Error', 500);
    }

    return this.shipmentTransformationService.transformShipment(
      responseData.data,
    );
  }
}
