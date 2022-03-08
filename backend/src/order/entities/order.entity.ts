import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
/* eslint-disable prettier/prettier */
@Schema()
export class Order  extends Document {
  
  @Prop()
  userId: string;
  
  @Prop()
  productId: string;

  @Prop({ default: 'packaging'})
  status: string;

  @Prop()
  price: number

  @Prop()
  quantity: number
}

export const OrderSchema = SchemaFactory.createForClass(Order)
