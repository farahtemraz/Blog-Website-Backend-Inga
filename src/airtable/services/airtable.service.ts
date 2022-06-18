import { Injectable } from '@nestjs/common';
import Airtable, { Base } from 'airtable';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AirtableService {
  private base: Base;

  constructor(private configService: ConfigService) {
    this.base = new Airtable({
      apiKey: this.configService.get<string>('AIRTABLE_KEY'),
    }).base(this.configService.get<string>('AIRTABLE_DB_BASE'));
  }

  createRecord(tableName: string, record: any) {
    return this.base(tableName).create(record);
  }
}
