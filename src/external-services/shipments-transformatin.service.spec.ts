import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { ShipmentTransformationService } from './shipments-transformation.service';
import {
  GetConsolidationShipmentDTO,
  GetExternalShipmentDTO,
} from '../shipments/dto/get-shipments.dto';
import { Shipment } from '../types';

describe('ShipmentTransformationService', () => {
  let service: ShipmentTransformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipmentTransformationService],
    }).compile();

    service = module.get<ShipmentTransformationService>(
      ShipmentTransformationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should transform shipment response', () => {
    const shipmentData: GetExternalShipmentDTO['data'] = [
      {
        attributes: {
          reference: 'RF00',
          portOfLoading: 'AValue',
          portOfDischarge: 'BValue',
          houseBillNumber: 'HBN00',
          createdAt: '2023-01-01T00:00:00Z',
        },
      },
      {
        attributes: {
          reference: 'G1998301200',
          portOfLoading: 'UKKXK',
          portOfDischarge: 'IABTRN',
          houseBillNumber: null,
          createdAt: '2023-11-24T17:41:42.985Z',
        },
      },
    ];

    const result: Shipment[] = service.transformShipment(shipmentData);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      reference: 'RF00',
      origin: 'AValue',
      destination: 'BValue',
      houseBill: 'HBN00',
      createdAt: '2023-01-01T00:00:00Z',
    });
    expect(result[1]).toEqual({
      reference: 'G1998301200',
      origin: 'UKKXK',
      destination: 'IABTRN',
      houseBill: null,
      createdAt: '2023-11-24T17:41:42.985Z',
    });
  });

  it('should transform filters', () => {
    const filters: GetConsolidationShipmentDTO['filters'] = {
      reference: {
        operator: 'eq',
        filter: 'RF00',
      },
      origin: {
        operator: 'startsWith',
        filter: 'AVal',
      },
    };

    const result = service.transformFilters(filters);

    expect(result).toEqual({
      reference: { $eq: 'RF00' },
      portOfLoading: { $startsWith: 'AVal' },
    });
  });

  it('should handle invalid external API response', () => {
    const shipmentData: GetExternalShipmentDTO['data'] = [
      {
        attributes: {
          portOfDischarge: 1232,
        },
      } as any,
    ];

    try {
      service.transformShipment(shipmentData);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(500);
    }
  });
});
