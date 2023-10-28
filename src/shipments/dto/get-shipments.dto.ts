import {
  IsString,
  ValidateNested,
  IsOptional,
  IsIn,
  IsDateString,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class DateRangeFilterArg {
  @IsDateString()
  from: string;
  @IsDateString()
  to: string;
}

class StringFilterArg {
  @IsIn(['eq', 'contains', 'startsWith'])
  operator: 'eq' | 'contains' | 'startsWith';

  @IsString()
  filter: string;
}

class Filters {
  @IsOptional()
  @Type(() => StringFilterArg)
  @ValidateNested()
  reference?: StringFilterArg;

  @IsOptional()
  @Type(() => StringFilterArg)
  @ValidateNested()
  origin?: StringFilterArg;

  @IsOptional()
  @Type(() => StringFilterArg)
  @ValidateNested()
  destination?: StringFilterArg;

  @IsOptional()
  @Type(() => StringFilterArg)
  @ValidateNested()
  houseBill?: StringFilterArg;

  @IsOptional()
  @Type(() => DateRangeFilterArg)
  @ValidateNested()
  createdAt?: DateRangeFilterArg;
}

export class GetConsolidationShipmentDTO {
  @IsOptional()
  @Type(() => Filters)
  @ValidateNested()
  filters?: Filters;
}

export class ShipmentDTO {
  @IsString()
  reference: string;

  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsString()
  houseBill: string;

  @IsDateString()
  createdAt: string;
  // createdAt: Date;
}

export class GetExternalShipmentDTO {
  @IsArray()
  @Type(() => ExternalShipmentData)
  @ValidateNested({ each: true })
  data: ExternalShipmentData[];

  @Type(() => ExternalShipmentMetaData)
  @ValidateNested()
  meta: ExternalShipmentMetaData[];
}

export class ExternalShipment {
  @IsString()
  reference: string;

  @IsString()
  portOfLoading: string;

  @IsString()
  portOfDischarge: string;

  @IsOptional()
  @IsString()
  houseBillNumber: string | null;

  @IsDateString()
  createdAt: string;
}

class ExternalShipmentData {
  @Type(() => ExternalShipment)
  @ValidateNested()
  attributes: ExternalShipment;
}

class ExternalShipmentPagination {
  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;

  @IsNumber()
  pageCount: number;

  @IsNumber()
  total: number;
}

export class ExternalShipmentMetaData {
  @Type(() => ExternalShipmentPagination)
  @ValidateNested()
  pagination: ExternalShipmentPagination;
}
