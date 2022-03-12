import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
/* eslint-disable prettier/prettier */
@Schema()
export class Order  extends Document {
  
  @Prop()
  userId: string;
  
  @Prop()
  productId: string;

  @Prop({ default: 'To ship'})
  status: string;

  @Prop()
  price: number

  @Prop()
  quantity: number

  @Prop({default : new Date().toLocaleDateString() })
  date: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order)
