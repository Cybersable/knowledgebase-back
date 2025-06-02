import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindAllWorkspaceDto {
  @Transform(({ value }) => Math.max(Number(value), 1))
  @IsNumber()
  @IsOptional()
  page = 1;

  @Transform(({ value }) => Math.max(Number(value), 1))
  @IsNumber()
  @IsOptional()
  limit = 10;
}