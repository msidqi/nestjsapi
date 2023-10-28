import { Body, Controller, Post } from '@nestjs/common';
import { ShipmentsService } from 'shipments/shipments.service';
import { GetConsolidationShipmentDTO } from 'shipments/dto/get-shipments.dto';
import { Shipment } from 'types';

@Controller('consolidation/shipments')
export class ShipmentsController {
  constructor(private readonly shipmentService: ShipmentsService) {}
  @Post()
  getShipment(
    @Body() getShipmentDTO: GetConsolidationShipmentDTO,
  ): Promise<Shipment[]> {
    return this.shipmentService.getShipment(getShipmentDTO.filters);
  }
}
