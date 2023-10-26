type ISOStringDate = string;

type StringFilterOperator = '$eq' | '$contains' | '$startsWith';

type StringFilter = Partial<{
  [key in StringFilterOperator]: string;
}>;

export interface ShipmentExternalApiFilters {
  reference: StringFilter;
  portOfLoading: StringFilter;
  portOfDischarge: StringFilter;
  houseBillNumber: StringFilter;
  createdAt: { $gte: ISOStringDate; $lte: ISOStringDate };
}

export interface ShipmentExternalApi {
  id: number;
  attributes: {
    reference: string;
    totalPieces: number;
    portOfLoading: string;
    portOfDischarge: string;
    portOfOrigin: string;
    portOfDestination: string;
    houseBillNumber: string | null;
    createdAt: ISOStringDate;
    updatedAt: ISOStringDate;
    isTransfer: boolean;
    isImport: boolean;
  };
}

export interface ShipmentExternalApiResponse {
  data: ShipmentExternalApi[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Shipment {
  reference: string;
  origin: string;
  destination: string;
  houseBill: string | null;
  createdAt: ISOStringDate;
}
