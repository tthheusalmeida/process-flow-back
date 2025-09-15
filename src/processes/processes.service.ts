import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProcessDto, UpdateProcessDto } from './processes.controller';

export interface IProcess {
  id: string;
  name: string;
  description?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProcessesService {
  private processes: IProcess[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440030',
      name: 'Interview Process',
      description: 'Step-by-step recruitment interview process',
      status: 'active',
      createdAt: new Date('2025-01-01T10:00:00.000Z'),
      updatedAt: new Date('2025-01-02T15:30:00.000Z'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440031',
      name: 'Onboarding',
      description: 'New employee onboarding workflow',
      status: 'active',
      createdAt: new Date('2025-02-01T09:15:00.000Z'),
      updatedAt: new Date('2025-02-02T18:45:00.000Z'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440032',
      name: 'Performance Review',
      description: 'Annual employee performance evaluation',
      status: 'inactive',
      createdAt: new Date('2025-03-01T08:20:00.000Z'),
      updatedAt: new Date('2025-03-05T12:00:00.000Z'),
    },
  ];

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

  create(createProcessDto: CreateProcessDto): IProcess {
    const newProcess: IProcess = {
      id: createProcessDto.id,
      name: createProcessDto.name,
      description: createProcessDto.description,
      status: createProcessDto.status,
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
