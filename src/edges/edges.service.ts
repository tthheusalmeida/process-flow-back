import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEdgeDto } from './edges.controller';

export interface IEdge {
  id: string;
  flowId: string;
  source: string;
  sourceHandle?: string;
  target: string;
  targetHandle: string;
  type: string;
}

@Injectable()
export class EdgesService {
  private edges: IEdge[] = [];

  findAll(): IEdge[] {
    return this.edges;
  }

  findOne(id: string): IEdge {
    const tool = this.edges.find((t) => t.id === id);
    if (!tool) {
      throw new NotFoundException(`Edge with ID ${id} not found`);
    }
    return tool;
  }

  findByFlowId(flowId: string): string[] {
    return this.edges.filter((d) => d.flowId === flowId).map((d) => d.id);
  }

  create(createEdgeDto: CreateEdgeDto): IEdge {
    const newEdge: IEdge = {
      ...createEdgeDto,
    };

    this.edges.push(newEdge);
    return newEdge;
  }

  delete(id: string): { message: string } {
    const toolIndex = this.edges.findIndex((t) => t.id === id);
    if (toolIndex === -1) {
      throw new NotFoundException(`Edge with ID ${id} not found`);
    }

    this.edges.splice(toolIndex, 1);
    return { message: `Edge with ID ${id} has been deleted` };
  }
}
