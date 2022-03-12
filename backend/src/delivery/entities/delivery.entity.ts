import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
/* eslint-disable prettier/prettier */
@Schema()
export class Delivery  extends Document {
  @Prop()
  customerName: string
  
  @Prop()
  driverName: string

  @Prop()
  orderId: string

  @Prop()
  customerAddr: string

  @Prop()
  orderDate: Date;

  @Prop({ default: 'shipping' })
  status: string

  @Prop()
  total:number
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery)
