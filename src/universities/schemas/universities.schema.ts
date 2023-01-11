import { Document, now } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UniversitieDocument = Universitie & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.web_pages;
      delete ret.alpha_two_code;
      delete ret.domains;
      delete ret.create_at;
      delete ret.update_at;
    },
  },
})
export class Universitie {
  @Prop()
  web_pages: string[];

  @Prop()
  state_province: string | null;

  @Prop()
  alpha_two_code: string;

  @Prop()
  country: string;

  @Prop()
  domains: string[];

  @Prop()
  name: string;

  @Prop({ default: now() })
  create_at: Date;

  @Prop({ default: now() })
  update_at: Date;
}
export const UniversitieSchema = SchemaFactory.createForClass(Universitie);
