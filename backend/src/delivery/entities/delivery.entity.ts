import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
/* eslint-disable prettier/prettier */
@Schema()
export class Delivery  extends Document {
  @Prop()
  name: string
  
  @Prop()
  driverId: string
  
  @Prop()
  orderId: string;

  @Prop()
  orderDate: Date;

  @Prop({ default: 'shipping' })
  status: string
  
  @Prop()
  CustomerAddr: string
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery)
