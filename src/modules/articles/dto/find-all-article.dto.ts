import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max } from 'class-validator';

export class FindAllArticleDto {
  @Transform(({ value }) => Math.max(Number(value), 1))
  @IsNumber()
  @IsOptional()
  page = 1;

  @Transform(({ value }) => Math.max(Number(value), 1))
  @IsNumber()
  @IsOptional()
  @Max(100)
  limit = 10;

  @IsString()
  @IsOptional()
  categoryId: string;

  @IsString()
  @IsOptional()
  workspaceId: string;
}
