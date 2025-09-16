import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { EdgesService } from './edges.service';

export class CreateEdgeDto {
  id: string;
  flowId: string;
  source: string;
  sourceHandle?: string;
  target: string;
  targetHandle: string;
  type: string;
}

@Controller('edges')
export class EdgesController {
  constructor(private readonly edgesService: EdgesService) {}

  @Get()
  findAll() {
    return this.edgesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.edgesService.findOne(id);
  }

  @Post()
  create(@Body() createToolDto: CreateEdgeDto) {
    return this.edgesService.create(createToolDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.edgesService.delete(id);
  }
}
