import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwnerDto, UpdateOwnerDto } from './owners.controller';

export interface IOwner {
  id: string;
  name: string;
  email: string;
  role?: string;
  flowId: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class OwnersService {
  private owners: IOwner[] = [];

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

  findByFlowId(flowId: string): string[] {
    return this.owners.filter((d) => d.flowId === flowId).map((d) => d.id);
  }

  create(createOwnerDto: CreateOwnerDto): IOwner {
    const newOwner: IOwner = {
      ...createOwnerDto,
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
