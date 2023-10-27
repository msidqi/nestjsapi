import { HttpException, Injectable } from '@nestjs/common';
import {
  ShipmentExternalApiFilters,
  ShipmentExternalApiResponse,
} from 'src/types';
import axios from 'axios';

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
