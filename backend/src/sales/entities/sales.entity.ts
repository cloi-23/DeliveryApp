import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Sales  extends Document {

  @Prop()
  orderId: string

  @Prop({ default: () => new Date() })
  date: Date;
}

export const SalesSchema = SchemaFactory.createForClass(Sales)
