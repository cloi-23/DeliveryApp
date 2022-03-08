import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
/* eslint-disable prettier/prettier */
@Schema()
export class Purhcase  extends Document {
  
  @Prop()
  productId: string;

  @Prop()
  cost: number;

  @Prop()
  quantity: number

}

export const PurhcaseSchema = SchemaFactory.createForClass(Purhcase)
