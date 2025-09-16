import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProcessDto, UpdateProcessDto } from './processes.controller';

export interface IProcess {
  id: string;
  name: string;
  description?: string;
  status: string;
  flowId: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProcessesService {
  private processes: IProcess[] = [];

  findAll(): IProcess[] {
    return this.processes;
  }

  findOne(id: string): IProcess {
    const process = this.processes.find((p) => p.id === id);
    if (!process) {
      throw new NotFoundException(`Process with ID ${id} not found`);
    }
    return process;
  }

  findByFlowId(flowId: string): string[] {
    return this.processes.filter((d) => d.flowId === flowId).map((d) => d.id);
  }

  create(createProcessDto: CreateProcessDto): IProcess {
    const newProcess: IProcess = {
      ...createProcessDto,
      createdAt: new Date(createProcessDto.createdAt),
      updatedAt: new Date(createProcessDto.updatedAt),
    };

    this.processes.push(newProcess);
    return newProcess;
  }

  update(id: string, updateProcessDto: Partial<UpdateProcessDto>): IProcess {
    const processIndex = this.processes.findIndex((p) => p.id === id);
    if (processIndex === -1) {
      throw new NotFoundException(`Process with ID ${id} not found`);
    }

    const updatedProcess: IProcess = {
      ...this.processes[processIndex],
      ...updateProcessDto,
      updatedAt: new Date(),
    };

    this.processes[processIndex] = updatedProcess;
    return updatedProcess;
  }

  delete(id: string): { message: string } {
    const processIndex = this.processes.findIndex((p) => p.id === id);
    if (processIndex === -1) {
      throw new NotFoundException(`Process with ID ${id} not found`);
    }

    this.processes.splice(processIndex, 1);
    return { message: `Process with ID ${id} has been deleted` };
  }
}
