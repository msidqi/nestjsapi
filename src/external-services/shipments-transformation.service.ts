import { Injectable } from '@nestjs/common';
import { GetConsolidationShipmentDTO } from 'src/shipments/dto/get-shipments.dto';
import {
  Shipment,
  ShipmentExternalApiFilters,
  ShipmentExternalApiResponse,
} from 'src/types';

@Injectable()
export class ShipmentTransformationService {
  transformShipment(shipmentResponse: ShipmentExternalApiResponse): Shipment[] {
    return shipmentResponse.data.map((shipment) => ({
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
          $gte: getShipmentFilters.createdAt.to,
          $lte: getShipmentFilters.createdAt.from,
        },
      }),
    };
  }
}
