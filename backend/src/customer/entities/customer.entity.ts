import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
/* eslint-disable prettier/prettier */
@Schema()
export class Customer  extends Document {
  
  @Prop()
  name: string;
  
  @Prop()
  address: string;

  @Prop()
  contact: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
  
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)
