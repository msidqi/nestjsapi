import { Injectable } from '@nestjs/common';
import { Shipment, ShipmentExternalApiResponse } from 'src/types';

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
}
