import { Product, ProductSchema } from './../product/entities/product.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Purhcase, PurhcaseSchema } from './entities/purchase.entities';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';


@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Purhcase.name,
      schema: PurhcaseSchema
    }
  ]),
  MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    }
  ])
],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService]
})
export class PurchaseModule {}
