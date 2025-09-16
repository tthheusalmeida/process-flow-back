import { Module } from '@nestjs/common';
import { FlowsController } from './flows.controller';
import { FlowsService } from './flows.service';
import { DepartmentsModule } from 'src/departments/departments.module';
import { DocumentsModule } from 'src/documents/documents.module';
import { OwnersModule } from 'src/owners/owners.module';
import { ProcessesModule } from 'src/processes/processes.module';
import { ToolsModule } from 'src/tools/tools.module';
import { EdgesModule } from 'src/edges/edges.module';

@Module({
  controllers: [FlowsController],
  providers: [FlowsService],
  imports: [
    DepartmentsModule,
    DocumentsModule,
    OwnersModule,
    ProcessesModule,
    ToolsModule,
    EdgesModule,
  ],
  exports: [FlowsService],
})
export class FlowsModule {}
