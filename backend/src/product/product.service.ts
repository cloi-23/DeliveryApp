import { HttpException, HttpStatus, Injectable } from '@nestjs/common'; 
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose'
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import * as DATA from '../../mockdata/MOCK_DATA.json'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  findAll() {
    return this.productModel.find()
  }

  async findOne(id: string) {
    const product = await this.productModel.findOne({ _id: id }).exec();
    return product;
  }

  async create(name: string, createProductDto: CreateProductDto) {
    // await this.productModel.insertMany(DATA);
    const product = new this.productModel(createProductDto);
    const isExisting = await this.productModel.findOne({ name: name }).exec()

    if (isExisting) {
      throw new HttpException('product already exist!', HttpStatus.CONFLICT)
    }
    return product.save();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productModel
    .findOneAndUpdate({ _id: id }, { $set: updateProductDto }, { new: true })
    .exec();
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    return product.remove();
  }
}
