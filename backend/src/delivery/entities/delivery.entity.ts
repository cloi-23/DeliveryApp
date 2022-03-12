import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
/* eslint-disable prettier/prettier */
@Schema()
export class Delivery  extends Document {

  @Prop()
  driverId: string

  @Prop()
  orderId: string

  @Prop({ default: 'shipping' })
  status: string

  @Prop()
  total:number
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery)
