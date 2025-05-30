import {IsOptional, IsString} from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  summary: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  slug: string;
}
