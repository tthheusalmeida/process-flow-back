import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToolDto, UpdateToolDto } from './tools.controller';

export interface ITool {
  id: string;
  name: string;
  description?: string;
  url?: string;
  category: string;
  flowId: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ToolsService {
  private tools: ITool[] = [];

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

  findByFlowId(flowId: string): string[] {
    return this.tools.filter((d) => d.flowId === flowId).map((d) => d.id);
  }

  create(createToolDto: CreateToolDto): ITool {
    const newTool: ITool = {
      ...createToolDto,
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
