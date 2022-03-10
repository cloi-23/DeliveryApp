import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
/* eslint-disable prettier/prettier */
@Schema()
export class Product  extends Document {
  
  @Prop()
  establishment: string

  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  price: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)
