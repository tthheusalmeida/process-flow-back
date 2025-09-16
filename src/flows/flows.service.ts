import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlowDto, UpdateFlowDto } from './flows.controller';
import { DepartmentsService } from '../departments/departments.service';
import { DocumentsService } from 'src/documents/documents.service';
import { OwnersService } from 'src/owners/owners.service';
import { ProcessesService } from 'src/processes/processes.service';
import { ToolsService } from 'src/tools/tools.service';
import { EdgesService } from 'src/edges/edges.service';

export interface IFlowNode {
  departments: string[];
  documents: string[];
  owners: string[];
  processes: string[];
  tools: string[];
}

export interface IFlow {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFlowWithRelations {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  departments: any[];
  documents: any[];
  processes: any[];
  owners: any[];
  tools: any[];
}

@Injectable()
export class FlowsService {
  constructor(
    private readonly departmentsService: DepartmentsService,
    private readonly documentsService: DocumentsService,
    private readonly ownersService: OwnersService,
    private readonly processesService: ProcessesService,
    private readonly toolsService: ToolsService,
    private readonly edgesServices: EdgesService,
  ) {}

  private flows: IFlow[] = [];

  findAll(): IFlow[] {
    return this.flows.map((flow) => ({
      ...flow,
      departments: this.departmentsService.findByFlowId(flow.id),
      documents: this.documentsService.findByFlowId(flow.id),
      owners: this.ownersService.findByFlowId(flow.id),
      processes: this.processesService.findByFlowId(flow.id),
      tools: this.toolsService.findByFlowId(flow.id),
      edges: this.edgesServices.findByFlowId(flow.id),
    }));
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
      throw new NotFoundException(`Flow with ID ${id} not found`);
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
      throw new NotFoundException(`Flow with ID ${id} not found`);
    }

    this.flows.splice(flowIndex, 1);
    return { message: `Flow with ID ${id} has been deleted` };
  }
}
