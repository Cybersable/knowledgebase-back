import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  summary: string;
}
