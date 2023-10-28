import { Injectable } from '@nestjs/common';
import {
  GetConsolidationShipmentDTO,
  GetExternalShipmentDTO,
} from '../shipments/dto/get-shipments.dto';
import { Shipment, ShipmentExternalApiFilters } from '../types';

@Injectable()
export class ShipmentTransformationService {
  transformShipment(
    shipmentResponse: GetExternalShipmentDTO['data'],
  ): Shipment[] {
    return shipmentResponse.map((shipment) => ({
      reference: shipment.attributes.reference,
      origin: shipment.attributes.portOfLoading,
      destination: shipment.attributes.portOfDischarge,
      houseBill: shipment.attributes.houseBillNumber,
      createdAt: shipment.attributes.createdAt,
    }));
  }

  transformFilters(
    getShipmentFilters: GetConsolidationShipmentDTO['filters'],
  ): Partial<ShipmentExternalApiFilters> {
    if (!getShipmentFilters) return {};
    return {
      ...(getShipmentFilters.reference && {
        reference: {
          [`$${getShipmentFilters.reference.operator}`]:
            getShipmentFilters.reference.filter,
        },
      }),
      ...(getShipmentFilters.origin && {
        portOfLoading: {
          [`$${getShipmentFilters.origin.operator}`]:
            getShipmentFilters.origin.filter,
        },
      }),
      ...(getShipmentFilters.destination && {
        portOfDischarge: {
          [`$${getShipmentFilters.destination.operator}`]:
            getShipmentFilters.destination.filter,
        },
      }),
      ...(getShipmentFilters.houseBill && {
        houseBillNumber: {
          [`$${getShipmentFilters.houseBill.operator}`]:
            getShipmentFilters.houseBill.filter,
        },
      }),
      ...(getShipmentFilters.createdAt && {
        createdAt: {
          $gte: getShipmentFilters.createdAt.from,
          $lte: getShipmentFilters.createdAt.to,
        },
      }),
    };
  }
}
