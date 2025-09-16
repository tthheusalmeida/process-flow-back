import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { OwnersService } from './owners.service';

export class CreateOwnerDto {
  id: string;
  name: string;
  email: string;
  role?: string;
  flowId: string;
  createdAt: string;
  updatedAt: string;
}

export class UpdateOwnerDto {
  name?: string;
  email?: string;
  role?: string;
}

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Get()
  findAll() {
    return this.ownersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownersService.findOne(id);
  }

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownersService.create(createOwnerDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownersService.update(id, updateOwnerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ownersService.delete(id);
  }
}
