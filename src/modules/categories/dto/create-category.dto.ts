import { IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  summary: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  workspaceId: string;
}
