import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToolDto, UpdateToolDto } from './tools.controller';

export interface ITool {
  id: string;
  name: string;
  description?: string;
  url?: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ToolsService {
  private tools: ITool[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440050',
      name: 'BambooHR',
      description: 'Human resources management system',
      url: 'https://bamboohr.com',
      category: 'HR Software',
      createdAt: new Date('2025-01-01T10:00:00.000Z'),
      updatedAt: new Date('2025-01-02T15:30:00.000Z'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440051',
      name: 'Slack',
      description: 'Team communication platform',
      url: 'https://slack.com',
      category: 'Communication',
      createdAt: new Date('2025-02-01T09:15:00.000Z'),
      updatedAt: new Date('2025-02-02T18:45:00.000Z'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440052',
      name: 'Jira',
      description: 'Project management and issue tracking',
      url: 'https://atlassian.com/jira',
      category: 'Project Management',
      createdAt: new Date('2025-03-01T08:20:00.000Z'),
      updatedAt: new Date('2025-03-05T12:00:00.000Z'),
    },
  ];

  findAll(): ITool[] {
    return this.tools;
  }

  findOne(id: string): ITool {
    const tool = this.tools.find((t) => t.id === id);
    if (!tool) {
      throw new NotFoundException(`Tool with ID ${id} not found`);
    }
    return tool;
  }

  create(createToolDto: CreateToolDto): ITool {
    const newTool: ITool = {
      id: createToolDto.id,
      name: createToolDto.name,
      description: createToolDto.description,
      url: createToolDto.url,
      category: createToolDto.category,
      createdAt: new Date(createToolDto.createdAt),
      updatedAt: new Date(createToolDto.updatedAt),
    };

    this.tools.push(newTool);
    return newTool;
  }

  update(id: string, updateToolDto: Partial<UpdateToolDto>): ITool {
    const toolIndex = this.tools.findIndex((t) => t.id === id);
    if (toolIndex === -1) {
      throw new NotFoundException(`Tool with ID ${id} not found`);
    }

    const updatedTool: ITool = {
      ...this.tools[toolIndex],
      ...updateToolDto,
      updatedAt: new Date(),
    };

    this.tools[toolIndex] = updatedTool;
    return updatedTool;
  }

  delete(id: string): { message: string } {
    const toolIndex = this.tools.findIndex((t) => t.id === id);
    if (toolIndex === -1) {
      throw new NotFoundException(`Tool with ID ${id} not found`);
    }

    this.tools.splice(toolIndex, 1);
    return { message: `Tool with ID ${id} has been deleted` };
  }
}
