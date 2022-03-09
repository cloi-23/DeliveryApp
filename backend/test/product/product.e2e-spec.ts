import { UpdateProductDto } from './../../src/product/dto/update-product-dto';
import { ProductModule } from './../../src/product/product.module';
import { CreateProductDto } from './../../src/product/dto/create-product-dto';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe,HttpServer,HttpStatus } from '@nestjs/common';
import * as request from 'supertest';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  const product = {
    name: 'prod2',
    establishment: '123 prod1 street',
    price:500,
 
  };
  let prod = {
    id:"id"
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule,
        MongooseModule.forRoot('mongodb://localhost:27019/TestDeliveryApp'),
        ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
        new ValidationPipe({
          whitelist:true,
          transform: true,
          forbidNonWhitelisted:true,
          transformOptions:{
            enableImplicitConversion:true
          }
        })
      )
    await app.init();
  });
  
  describe('Create Product [POST /]',()=>{
    it('should return new product object', ()=>{
        return request(app.getHttpServer())
        .post('/product')
        .send(product as CreateProductDto)
        .expect(HttpStatus.CREATED)
        .then(({body}) => {
          const expectedProduct = expect.objectContaining(product)
          prod={
            id:body._id,
          }
          expect(body).toEqual(expectedProduct);
        });
      });

    it('should return CONFLICT and send ERROR_MESSAGE, when product already exits ', ()=>{
        return request(app.getHttpServer())
        .post('/product')
        .send(product as CreateProductDto)
        .expect(HttpStatus.CONFLICT)
        .then(({body}) => {
          const expectErrorMessage = 'product already exist!'
          expect(body.message).toEqual(expectErrorMessage);
        });
    });

  })


  it('FindAll Product [GET /]', ()=>{
    return request(app.getHttpServer())
    .get('/product')
    .send(product as CreateProductDto)
    .expect(HttpStatus.OK)
    .then(({body}) => {
      const expectedProduct = {
        name: product.name,
        establishment:product.establishment,
        price:product.price,
     
      }
      const dataBody={
        name: body[body.length-1].name,
        establishment:body[body.length-1].establishment,
        price:body[body.length-1].price,
      }
      expect(body.length).toBeGreaterThan(0);
      expect(dataBody).toEqual(expectedProduct);
    });
  });

  describe('FindOne Product [GET /:id]',()=>{
    it('should return an product object', ()=>{
        return request(app.getHttpServer())
        .get(`/product/${prod.id}`)
        .expect(HttpStatus.OK)
        .then(({body}) => {
          const expectedProduct = expect.objectContaining(product)
         expect(body).toEqual(expectedProduct);
        });
      });
      it('should return NOT_FOUND and ERROR_MESSAGE, when prodId is not exist', ()=>{
          const errorProdId = "ERROR_ID"
        return request(app.getHttpServer())
        .get(`/product/${errorProdId}`)
        .expect(HttpStatus.NOT_FOUND)
        .then(({body}) => {
            const expectedErrorMessage =  `Product #${errorProdId} not found`
            expect(body.message).toEqual(expectedErrorMessage);
        });
      });
  })

  it('Update Customer [Patch /:id]', ()=>{
    const updateProduct:UpdateProductDto={
        name: 'prod3',
        establishment: '123 prod1 street',
        price:1500,
    }
    return request(app.getHttpServer())
    .patch(`/product/${prod.id}`)
    .send(updateProduct as UpdateProductDto)
    .then(() => {
     return request(app.getHttpServer())
          .get(`/product/${prod.id}`)
          .then(({ body }) => {
            expect(body.name).toEqual(updateProduct.name);
          });

    });
  });

  it('Delete one Customer [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete(`/product/${prod.id}`)
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get(`/product/${prod.id}`)
          .expect(HttpStatus.NOT_FOUND)
          .then(({body}) => {
            const expectedErrorMessage =  `Product #${prod.id} not found`
            expect(body.message).toEqual(expectedErrorMessage);
        });
      })
  });

  afterAll(async () => {
    await app.close()
  })
});

