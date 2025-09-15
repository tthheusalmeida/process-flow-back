import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from './departments.controller';
import { INode } from 'src/utils/consts';

export interface IDepartment {
  id: string;
  position: string;
  type: string;
  data: Date;
  flowId: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class DepartmentsService {
  private departments: INode[] = [];

  findAll(): INode[] {
    return this.departments;
  }

  findOne(id: string): INode {
    const department = this.departments.find((d) => d.id === id);
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  findByFlowId(flowId: string): string[] {
    return this.departments.filter((d) => d.flowId === flowId).map((d) => d.id);
  }

  create(createDepartmentDto: CreateDepartmentDto): INode {
    const newDepartment: INode = {
      ...createDepartmentDto,
      createdAt: new Date(createDepartmentDto.createdAt),
      updatedAt: new Date(createDepartmentDto.updatedAt),
    };

    this.departments.push(newDepartment);

    return newDepartment;
  }

  update(id: string, updateDepartmentDto: Partial<UpdateDepartmentDto>): INode {
    const departmentIndex = this.departments.findIndex((d) => d.id === id);
    if (departmentIndex === -1) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    const updatedDepartment: INode = {
      ...this.departments[departmentIndex],
      ...updateDepartmentDto,
      updatedAt: new Date(),
    };

    this.departments[departmentIndex] = updatedDepartment;
    return updatedDepartment;
  }

  delete(id: string): { message: string } {
    const departmentIndex = this.departments.findIndex((d) => d.id === id);
    if (departmentIndex === -1) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    this.departments.splice(departmentIndex, 1);
    return { message: `Department with ID ${id} has been deleted` };
  }
}
