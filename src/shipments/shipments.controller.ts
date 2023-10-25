import { Body, Controller, Post } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { GetConsolidationShipmentDTO } from './dto/get-shipments.dto';
import { Shipment } from 'src/types';

@Controller('consolidation/shipments')
export class ShipmentsController {
  constructor(private readonly shipmentService: ShipmentsService) {}
  @Post()
  getShipment(
    @Body() createCatDto: GetConsolidationShipmentDTO,
  ): Promise<Shipment[]> {
    console.log(createCatDto);
    return this.shipmentService.getShipment();
  }
}