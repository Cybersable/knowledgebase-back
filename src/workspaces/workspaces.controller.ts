import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { FindAllWorkspaceDto } from 'src/workspaces/dto/find-all-workspace.dto';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspacesService.create(createWorkspaceDto);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  findAll(@Query() queryParams: FindAllWorkspaceDto) {
    const skip = queryParams.limit * (queryParams.page - 1);

    return this.workspacesService.findAll({
      take: queryParams.limit,
      skip: skip,
    });
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const workspace = await this.workspacesService.findOne(id);

    if (!workspace) {
      throw new NotFoundException(`Workspace with id ${id} does not exist.`);
    }

    return workspace;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspacesService.update(id, updateWorkspaceDto);
  }

  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(id);
  }
}
