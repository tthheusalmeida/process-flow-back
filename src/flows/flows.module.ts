import { Module } from '@nestjs/common';
import { FlowsController } from './flows.controller';
import { FlowsService } from './flows.service';
import { DepartmentsModule } from 'src/departments/departments.module';

@Module({
  controllers: [FlowsController],
  providers: [FlowsService],
  imports: [DepartmentsModule],
  exports: [FlowsService],
})
export class FlowsModule {}
