import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentExternalApiResponse } from '../types';
import { ExternalApiService } from '../external-services/external-api.service';
import { ShipmentTransformationService } from '../external-services/shipments-transformation.service';
import { GetConsolidationShipmentDTO } from './dto/get-shipments.dto';

describe('ShipmentsService', () => {
  let shipmentsService: ShipmentsService;
  let shipmentTransformationService: ShipmentTransformationService;
  let externalApiService: ExternalApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipmentsService,
        ExternalApiService,
        ShipmentTransformationService,
      ],
    }).compile();

    shipmentsService = module.get<ShipmentsService>(ShipmentsService);
    shipmentTransformationService = module.get<ShipmentTransformationService>(
      ShipmentTransformationService,
    );
    externalApiService = module.get<ExternalApiService>(ExternalApiService);
  });

  it('services should be defined', () => {
    expect(shipmentsService).toBeDefined();
    expect(shipmentTransformationService).toBeDefined();
    expect(externalApiService).toBeDefined();
  });

  it('should fetch and filter shipments with eq operator', async () => {
    const mockedData: ShipmentExternalApiResponse = {
      data: [
        {
          id: 1,
          attributes: {
            reference: 'RF00',
            portOfLoading: 'AValue',
            portOfDischarge: 'BValue',
            houseBillNumber: 'HBN00',
            createdAt: '2023-01-01T00:00:00Z',
            isImport: false,
            isTransfer: false,
            portOfDestination: 'XValue',
            portOfOrigin: 'YValue',
            totalPieces: 123,
            updatedAt: '2023-01-01T00:00:00Z',
          },
        },
        {
          id: 899,
          attributes: {
            reference: 'G1998301200',
            totalPieces: 156,
            portOfLoading: 'UKKXK',
            portOfDischarge: 'IABTRN',
            portOfOrigin: 'UKKXK',
            portOfDestination: 'BCTRN',
            houseBillNumber: null,
            createdAt: '2023-11-24T17:41:42.985Z',
            updatedAt: '2023-11-24T17:41:42.985Z',
            isTransfer: false,
            isImport: false,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: 2,
        },
      },
    };

    // Mock the external API service to return the mock response
    externalApiService.fetchShipmentFromExternalApi = jest
      .fn()
      .mockResolvedValue(mockedData);

    // Define your input filters
    const filters: GetConsolidationShipmentDTO['filters'] = {
      reference: {
        operator: 'eq',
        filter: 'RF00',
      },
    };

    const result = await shipmentsService.getShipment(filters);

    // Assert the result, perform your expectations here
    expect(result.length).toEqual(1);
    expect(result[0]?.reference).toEqual(filters.reference?.filter);
  });

  it('should fetch and filter shipments with startsWith operator', async () => {
    const mockedData: ShipmentExternalApiResponse = {
      data: [
        {
          id: 1,
          attributes: {
            reference: 'RF00',
            portOfLoading: 'UKKXK',
            portOfDischarge: 'BValue',
            houseBillNumber: 'HBN00',
            createdAt: '2023-01-01T00:00:00Z',
            isImport: false,
            isTransfer: false,
            portOfDestination: 'XValue',
            portOfOrigin: 'YValue',
            totalPieces: 123,
            updatedAt: '2023-01-01T00:00:00Z',
          },
        },
        {
          id: 899,
          attributes: {
            reference: 'G1998301200',
            totalPieces: 156,
            portOfLoading: 'UKKXK',
            portOfDischarge: 'IABTRN',
            portOfOrigin: 'UKKXK',
            portOfDestination: 'BCTRN',
            houseBillNumber: null,
            createdAt: '2023-11-24T17:41:42.985Z',
            updatedAt: '2023-11-24T17:41:42.985Z',
            isTransfer: false,
            isImport: false,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: 2,
        },
      },
    };

    // Mock the external API service to return the mock response
    externalApiService.fetchShipmentFromExternalApi = jest
      .fn()
      .mockResolvedValue(mockedData);

    // Define your input filters
    const filters: GetConsolidationShipmentDTO['filters'] = {
      origin: {
        operator: 'startsWith',
        filter: 'UK',
      },
    };

    const result = await shipmentsService.getShipment(filters);

    // Assert the result, perform your expectations here
    expect(result.length).toEqual(2);
    expect(result[0]?.origin).toEqual(filters.origin?.filter);
    expect(result[1]?.origin).toEqual(filters.origin?.filter);
  });

  it('should fetch and filter shipments with contains operator', async () => {
    const mockedData: ShipmentExternalApiResponse = {
      data: [
        {
          id: 1,
          attributes: {
            reference: 'RF00',
            portOfLoading: 'UKKXK',
            portOfDischarge: 'BValue',
            houseBillNumber: 'HBN00',
            createdAt: '2023-01-01T00:00:00Z',
            isImport: false,
            isTransfer: false,
            portOfDestination: 'XValue',
            portOfOrigin: 'YValue',
            totalPieces: 123,
            updatedAt: '2023-01-01T00:00:00Z',
          },
        },
        {
          id: 899,
          attributes: {
            reference: 'G1998301200',
            totalPieces: 156,
            portOfLoading: 'UKKXK',
            portOfDischarge: 'IABTRN',
            portOfOrigin: 'UKKXK',
            portOfDestination: 'BCTRN',
            houseBillNumber: null,
            createdAt: '2023-11-24T17:41:42.985Z',
            updatedAt: '2023-11-24T17:41:42.985Z',
            isTransfer: false,
            isImport: false,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: 2,
        },
      },
    };

    // Mock the external API service to return the mock response
    externalApiService.fetchShipmentFromExternalApi = jest
      .fn()
      .mockResolvedValue(mockedData);

    // Define your input filters
    const filters: GetConsolidationShipmentDTO['filters'] = {
      houseBill: {
        operator: 'contains',
        filter: '00',
      },
    };

    const result = await shipmentsService.getShipment(filters);

    // Assert the result, perform your expectations here
    expect(result.length).toEqual(1);
    expect(result[0]?.houseBill).toEqual('HBN00');
  });

  it('should handle invalid external API response', async () => {
    // Mock the external API service to return an invalid response
    externalApiService.fetchShipmentFromExternalApi = jest
      .fn()
      .mockResolvedValue({ data: 'invalid-response' });

    // Define your input filters
    const filters: GetConsolidationShipmentDTO['filters'] = {
      houseBill: {
        operator: 'contains',
        filter: '00',
      },
    };

    // Call the service method and expect it to throw an HttpException
    await expect(shipmentsService.getShipment(filters)).rejects.toThrow(
      HttpException,
    );
  });
});
