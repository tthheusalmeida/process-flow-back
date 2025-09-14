import { Module } from '@nestjs/common';
import { FlowsModule } from './flows/flows.module';

@Module({
  imports: [FlowsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
