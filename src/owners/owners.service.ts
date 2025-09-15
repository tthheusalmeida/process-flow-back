import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwnerDto, UpdateOwnerDto } from './owners.controller';

export interface IOwner {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class OwnersService {
  private owners: IOwner[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440040',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'HR Manager',
      createdAt: new Date('2025-01-01T10:00:00.000Z'),
      updatedAt: new Date('2025-01-02T15:30:00.000Z'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440041',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'IT Director',
      createdAt: new Date('2025-02-01T09:15:00.000Z'),
      updatedAt: new Date('2025-02-02T18:45:00.000Z'),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440042',
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      role: 'Finance Manager',
      createdAt: new Date('2025-03-01T08:20:00.000Z'),
      updatedAt: new Date('2025-03-05T12:00:00.000Z'),
    },
  ];

  findAll(): IOwner[] {
    return this.owners;
  }

  findOne(id: string): IOwner {
    const owner = this.owners.find((o) => o.id === id);
    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
    return owner;
  }

  create(createOwnerDto: CreateOwnerDto): IOwner {
    const newOwner: IOwner = {
      id: createOwnerDto.id,
      name: createOwnerDto.name,
      email: createOwnerDto.email,
      role: createOwnerDto.role,
      createdAt: new Date(createOwnerDto.createdAt),
      updatedAt: new Date(createOwnerDto.updatedAt),
    };

    this.owners.push(newOwner);
    return newOwner;
  }

  update(id: string, updateOwnerDto: Partial<UpdateOwnerDto>): IOwner {
    const ownerIndex = this.owners.findIndex((o) => o.id === id);
    if (ownerIndex === -1) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }

    const updatedOwner: IOwner = {
      ...this.owners[ownerIndex],
      ...updateOwnerDto,
      updatedAt: new Date(),
    };

    this.owners[ownerIndex] = updatedOwner;
    return updatedOwner;
  }

  delete(id: string): { message: string } {
    const ownerIndex = this.owners.findIndex((o) => o.id === id);
    if (ownerIndex === -1) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }

    this.owners.splice(ownerIndex, 1);
    return { message: `Owner with ID ${id} has been deleted` };
  }
}
