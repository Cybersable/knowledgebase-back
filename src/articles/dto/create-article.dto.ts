import { IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  slug: string;

  @IsString()
  workplaceId: string;

  @IsString()
  categoryId: string;
}
