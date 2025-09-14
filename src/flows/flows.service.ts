import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlowDto, UpdateFlowDto } from './flows.controller';

export interface IFlow {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class FlowsService {
  private flows: IFlow[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Recruitment and Selection',
      createdAt: new Date('2025-01-01T10:00:00.000Z'),
      updatedAt: new Date('2025-01-02T15:30:00.000Z'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      title: 'Performance Evaluation',
      createdAt: new Date('2025-02-01T09:15:00.000Z'),
      updatedAt: new Date('2025-02-02T18:45:00.000Z'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      title: 'Termination',
      createdAt: new Date('2025-03-01T08:20:00.000Z'),
      updatedAt: new Date('2025-03-05T12:00:00.000Z'),
    },
  ];

  findAll(): IFlow[] {
    return this.flows;
  }

  findOne(id: string): IFlow {
    const flow = this.flows.find((f) => f.id === id);
    if (!flow) {
      throw new NotFoundException(`Flow with ID ${id} not found`);
    }
    return flow;
  }

  create(createFlowDto: CreateFlowDto): IFlow {
    const newFlow: IFlow = {
      id: createFlowDto.id,
      title: createFlowDto.title,
      createdAt: new Date(createFlowDto.createdAt),
      updatedAt: new Date(createFlowDto.updatedAt),
    };

    this.flows.push(newFlow);
    return newFlow;
  }

  update(id: string, updateFlowDto: Partial<UpdateFlowDto>): IFlow {
    const flowIndex = this.flows.findIndex((f) => f.id === id);
    if (flowIndex === -1) {
      throw new NotFoundException(`IFlow with ID ${id} not found`);
    }

    const updatedFlow: IFlow = {
      ...this.flows[flowIndex],
      ...updateFlowDto,
      updatedAt: new Date(),
    };

    this.flows[flowIndex] = updatedFlow;
    return updatedFlow;
  }

  delete(id: string): { message: string } {
    const flowIndex = this.flows.findIndex((f) => f.id === id);
    if (flowIndex === -1) {
      throw new NotFoundException(`IFlow with ID ${id} not found`);
    }

    this.flows.splice(flowIndex, 1);
    return { message: `IFlow with ID ${id} has been deleted` };
  }
}
