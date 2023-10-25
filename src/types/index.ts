type ISOStringDate = string;

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
