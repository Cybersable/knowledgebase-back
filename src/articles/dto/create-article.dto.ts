import { IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  summary: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  categoryId: string;
}
