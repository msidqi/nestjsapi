import {
  IsString,
  ValidateNested,
  IsOptional,
  IsIn,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

class DateRangeFilterArg {
  @IsDateString()
  from: string;
  // from: Date;
  @IsDateString()
  to: string;
  // to: Date;
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
