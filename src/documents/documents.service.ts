import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto, UpdateDocumentDto } from './documents.controller';

export interface IDocument {
  id: string;
  title: string;
  description?: string;
  url?: string;
  flowId: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class DocumentsService {
  private documents: IDocument[] = [];

  findAll(): IDocument[] {
    return this.documents;
  }

  findOne(id: string): IDocument {
    const document = this.documents.find((d) => d.id === id);
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  findByFlowId(flowId: string): string[] {
    return this.documents.filter((d) => d.flowId === flowId).map((d) => d.id);
  }

  create(createDocumentDto: CreateDocumentDto): IDocument {
    const newDocument: IDocument = {
      ...createDocumentDto,
      createdAt: new Date(createDocumentDto.createdAt),
      updatedAt: new Date(createDocumentDto.updatedAt),
    };

    this.documents.push(newDocument);
    return newDocument;
  }

  update(id: string, updateDocumentDto: Partial<UpdateDocumentDto>): IDocument {
    const documentIndex = this.documents.findIndex((d) => d.id === id);
    if (documentIndex === -1) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    const updatedDocument: IDocument = {
      ...this.documents[documentIndex],
      ...updateDocumentDto,
      updatedAt: new Date(),
    };

    this.documents[documentIndex] = updatedDocument;
    return updatedDocument;
  }

  delete(id: string): { message: string } {
    const documentIndex = this.documents.findIndex((d) => d.id === id);
    if (documentIndex === -1) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    this.documents.splice(documentIndex, 1);
    return { message: `Document with ID ${id} has been deleted` };
  }
}
