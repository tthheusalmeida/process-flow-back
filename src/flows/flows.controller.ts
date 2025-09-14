import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { FlowsService } from './flows.service';

export class CreateFlowDto {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export class UpdateFlowDto {
  title?: string;
}

@Controller('flows')
export class FlowsController {
  constructor(private readonly flowsService: FlowsService) {}

  @Get()
  findAll() {
    return this.flowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flowsService.findOne(id);
  }

  @Post()
  create(@Body() createFlowDto: CreateFlowDto) {
    return this.flowsService.create(createFlowDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlowDto: UpdateFlowDto) {
    return this.flowsService.update(id, updateFlowDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.flowsService.delete(id);
  }
}
