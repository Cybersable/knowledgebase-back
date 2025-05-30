import {IsOptional, IsString} from 'class-validator';

export class CreateWorkplaceDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  slug: string;
}
