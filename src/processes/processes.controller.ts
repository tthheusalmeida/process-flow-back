import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { ProcessesService } from './processes.service';

export class CreateProcessDto {
  id: string;
  name: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export class UpdateProcessDto {
  name?: string;
  description?: string;
  status?: string;
}

@Controller('processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Get()
  findAll() {
    return this.processesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processesService.findOne(id);
  }

  @Post()
  create(@Body() createProcessDto: CreateProcessDto) {
    return this.processesService.create(createProcessDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcessDto: UpdateProcessDto) {
    return this.processesService.update(id, updateProcessDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.processesService.delete(id);
  }
}
