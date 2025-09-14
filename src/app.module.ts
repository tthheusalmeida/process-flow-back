import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FlowsModule } from './flows/flows.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
    }) as unknown as import('@nestjs/common').Type<any>,
    FlowsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
