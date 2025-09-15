import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto, UpdateDocumentDto } from './documents.controller';

export interface IDocument {
  id: string;
  title: string;
  description?: string;
  url?: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class DocumentsService {
  private documents: IDocument[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440020',
      title: 'Employee Handbook',
      description: 'Comprehensive guide for all employees',
      url: 'https://company.com/docs/handbook.pdf',
      type: 'PDF',
      createdAt: new Date('2025-01-01T10:00:00.000Z'),
      updatedAt: new Date('2025-01-02T15:30:00.000Z'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440021',
      title: 'Code of Conduct',
      description: 'Company ethics and conduct guidelines',
      url: 'https://company.com/docs/conduct.pdf',
      type: 'PDF',
      createdAt: new Date('2025-02-01T09:15:00.000Z'),
      updatedAt: new Date('2025-02-02T18:45:00.000Z'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440022',
      title: 'Safety Procedures',
      description: 'Workplace safety guidelines and procedures',
      url: 'https://company.com/docs/safety.pdf',
      type: 'PDF',
      createdAt: new Date('2025-03-01T08:20:00.000Z'),
      updatedAt: new Date('2025-03-05T12:00:00.000Z'),
    },
  ];

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

  create(createDocumentDto: CreateDocumentDto): IDocument {
    const newDocument: IDocument = {
      id: createDocumentDto.id,
      title: createDocumentDto.title,
      description: createDocumentDto.description,
      url: createDocumentDto.url,
      type: createDocumentDto.type,
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
