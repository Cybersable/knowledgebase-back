import { IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  slug: string;

  @IsString()
  workplaceId: string;
}
