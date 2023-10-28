import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ShipmentExternalApiFilters, ShipmentExternalApiResponse } from 'types';

@Injectable()
export class ExternalApiService {
  async fetchShipmentFromExternalApi(
    filters: Partial<ShipmentExternalApiFilters>,
  ): Promise<ShipmentExternalApiResponse> {
    const apiUrl = process.env.EXTERNAL_API || '';
    try {
      const response = await axios.get<ShipmentExternalApiResponse>(apiUrl, {
        headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
        params: { filters },
      });
      return response.data;
    } catch (e) {
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
