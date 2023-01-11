import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UniversitieDocument = Universitie & Document;

@Schema()
export class Universitie {
  @Prop()
  web_pages: string[];

  @Prop()
  state_province: string;

  @Prop()
  alpha_two_code: string;

  @Prop()
  country: string;

  @Prop()
  domains: string[];

  @Prop()
  name: string;
}

export const UniversitieSchema = SchemaFactory.createForClass(Universitie);
