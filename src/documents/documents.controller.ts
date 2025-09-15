import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';

export class CreateDocumentDto {
  id: string;
  title: string;
  description?: string;
  url?: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export class UpdateDocumentDto {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
}

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.documentsService.delete(id);
  }
}
