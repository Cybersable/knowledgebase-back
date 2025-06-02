import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class FindAllCategoryDto {
  @Transform(({ value }) => Math.max(Number(value), 1))
  @IsNumber()
  @IsOptional()
  page = 1

  @Transform(({ value }) => Math.max(Number(value), 1))
  @IsNumber()
  @IsOptional()
  limit = 10

  @IsString()
  workspaceId
}