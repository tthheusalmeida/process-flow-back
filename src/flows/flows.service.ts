import { Injectable } from '@nestjs/common';

export interface Item {
  id: string;
  title: string;
}

@Injectable()
export class FlowsService {
  private readonly items: Item[] = [
    {
      id: '123',
      title: 'Potenciais candidatos',
    },
    {
      id: '456',
      title: 'Contratação',
    },
    {
      id: '789',
      title: 'Gerenciamento de Funcionários',
    },
  ];

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: string): Item | undefined {
    return this.items.find((item) => item.id === id);
  }

  create(title: string): Item {
    const newItem: Item = {
      id: (Date.now() + Math.random()).toString(),
      title,
    };
    this.items.push(newItem);
    return newItem;
  }
}
