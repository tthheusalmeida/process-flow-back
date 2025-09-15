import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from './departments.controller';

export interface IDepartment {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class DepartmentsService {
  private departments: IDepartment[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440010',
      name: 'Human Resources',
      description: 'Manages recruitment, employee relations, and HR policies',
      createdAt: new Date('2025-01-01T10:00:00.000Z'),
      updatedAt: new Date('2025-01-02T15:30:00.000Z'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440011',
      name: 'Information Technology',
      description:
        'Handles IT infrastructure, software development, and technical support',
      createdAt: new Date('2025-02-01T09:15:00.000Z'),
      updatedAt: new Date('2025-02-02T18:45:00.000Z'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440012',
      name: 'Finance',
      description: 'Manages budgets, financial reporting, and accounting',
      createdAt: new Date('2025-03-01T08:20:00.000Z'),
      updatedAt: new Date('2025-03-05T12:00:00.000Z'),
    },
  ];

  findAll(): IDepartment[] {
    return this.departments;
  }

  findOne(id: string): IDepartment {
    const department = this.departments.find((d) => d.id === id);
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  create(createDepartmentDto: CreateDepartmentDto): IDepartment {
    const newDepartment: IDepartment = {
      id: createDepartmentDto.id,
      name: createDepartmentDto.name,
      description: createDepartmentDto.description,
      createdAt: new Date(createDepartmentDto.createdAt),
      updatedAt: new Date(createDepartmentDto.updatedAt),
    };

    this.departments.push(newDepartment);
    return newDepartment;
  }

  update(
    id: string,
    updateDepartmentDto: Partial<UpdateDepartmentDto>,
  ): IDepartment {
    const departmentIndex = this.departments.findIndex((d) => d.id === id);
    if (departmentIndex === -1) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    const updatedDepartment: IDepartment = {
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
