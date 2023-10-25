import { Injectable } from '@nestjs/common';
import { ShipmentExternalApiResponse } from 'src/types';
import axios from 'axios';

@Injectable()
export class ExternalApiService {
  async fetchShipmentFromExternalApi(): Promise<ShipmentExternalApiResponse> {
    const apiUrl = process.env.EXTERNAL_API || '';
    const response = await axios.get<ShipmentExternalApiResponse>(apiUrl, {
      headers: { Authorization: process.env.API_TOKEN },
    });
    return response.data;
    // return tmpResponse;
  }
}

const tmpResponse: ShipmentExternalApiResponse = {
  data: [
    {
      id: 898,
      attributes: {
        reference: 'XYZ1234',
        totalPieces: 1,
        portOfLoading: 'USNYC',
        portOfDischarge: 'USCHI',
        portOfOrigin: 'USNYC',
        portOfDestination: 'USCHI',
        houseBillNumber: 'ABC123456',
        createdAt: '2023-10-23T13:44:38.376Z',
        updatedAt: '2023-10-23T16:58:34.543Z',
        isTransfer: false,
        isImport: false,
      },
    },
    {
      id: 899,
      attributes: {
        reference: 'S104838200',
        totalPieces: 156,
        portOfLoading: 'USKCK',
        portOfDischarge: 'ITTRN',
        portOfOrigin: 'USKCK',
        portOfDestination: 'ITTRN',
        houseBillNumber: null,
        createdAt: '2023-10-24T17:41:42.985Z',
        updatedAt: '2023-10-24T17:41:42.985Z',
        isTransfer: false,
        isImport: false,
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 2,
    },
  },
};
