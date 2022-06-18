import { AirtableService } from './services/airtable.service';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [AirtableService],
  exports: [AirtableService],
})
export class AirtableModule {}
