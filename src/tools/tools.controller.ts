import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { ToolsService } from './tools.service';

export class CreateToolDto {
  id: string;
  name: string;
  description?: string;
  url?: string;
  category: string;
  flowId: string;
  createdAt: string;
  updatedAt: string;
}

export class UpdateToolDto {
  name?: string;
  description?: string;
  url?: string;
  category?: string;
}

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  findAll() {
    return this.toolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(id);
  }

  @Post()
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.create(createToolDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(id, updateToolDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.toolsService.delete(id);
  }
}
