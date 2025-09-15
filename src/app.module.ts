import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FlowsModule } from './flows/flows.module';
import { DepartmentsModule } from './departments/departments.module';
import { DocumentsModule } from './documents/documents.module';
import { OwnersModule } from './owners/owners.module';
import { ProcessesModule } from './processes/processes.module';
import { ToolsModule } from './tools/tools.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
    }) as unknown as import('@nestjs/common').Type<any>,
    DepartmentsModule,
    DocumentsModule,
    FlowsModule,
    OwnersModule,
    ProcessesModule,
    ToolsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
