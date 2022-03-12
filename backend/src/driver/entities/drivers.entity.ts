import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
/* eslint-disable prettier/prettier */
@Schema()
export class Driver  extends Document {
  
  @Prop()
  name: string;

  @Prop()
  contact: string;

  @Prop()
  address: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
  
  @Prop()
  device: string
}

export const DriverrSchema = SchemaFactory.createForClass(Driver)
