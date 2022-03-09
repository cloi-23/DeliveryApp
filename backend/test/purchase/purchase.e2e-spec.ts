import { UpdatePurchaseDto } from './../../src/purchase/dto/update-purchase.dto';
import { CreatePurchaseDto } from './../../src/purchase/dto/create-purchase.dto';

import { PurchaseModule } from './../../src/purchase/purchase.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe,HttpServer,HttpStatus } from '@nestjs/common';
import * as request from 'supertest';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  const purchase = {
    productId: 'productId-4',
    cost: 200,
    quantity:100,
 
  };
  let purchaseId = {
    id:"id"
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PurchaseModule,
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
 

  describe('Create Purchace [POST /]',()=>{
    
      it('should return new purchase object', ()=>{
        return request(app.getHttpServer())
        .post('/purchase')
        .send(purchase as CreatePurchaseDto)
        .expect(HttpStatus.CREATED)
        .then(({body}) => {
          const expectedPurchase = expect.objectContaining(purchase)
          purchaseId={
            id:body._id,
          }
          expect(body).toEqual(expectedPurchase);
        });
      });

  })


  it('FindAll purchase [GET /]', ()=>{
    return request(app.getHttpServer())
    .get('/purchase')
    .send(purchase as CreatePurchaseDto)
    .expect(HttpStatus.OK)
    .then(({body}) => {
      const expectedPurchase = {
        productId: purchase.productId,
        cost:purchase.cost,
        quantity:purchase.quantity,
     
      }
      const dataBody={
        productId: body[body.length-1].productId,
        cost:body[body.length-1].cost,
        quantity:body[body.length-1].quantity,
      }
      expect(body.length).toBeGreaterThan(0);
      expect(dataBody).toEqual(expectedPurchase);
    });
  });

  describe('FindOne purchase [GET /:id]',()=>{
    it('should return an purchase object', ()=>{
        return request(app.getHttpServer())
        .get(`/purchase/${purchaseId.id}`)
        .expect(HttpStatus.OK)
        .then(({body}) => {
          const expectedpurchase = expect.objectContaining(purchase)
         expect(body).toEqual(expectedpurchase);
        });
      });
      it('should return NOT_FOUND and ERROR_MESSAGE, when purchaseIdId is not exist', ()=>{
          const errorpurchaseIdId = "ERROR_ID"
        return request(app.getHttpServer())
        .get(`/purchase/${errorpurchaseIdId}`)
        .expect(HttpStatus.NOT_FOUND)
        .then(({body}) => {
            const expectedErrorMessage =  `Purchase #${errorpurchaseIdId} not found`
            expect(body.message).toEqual(expectedErrorMessage);
        });
      });
  })

  it('Update Customer [Patch /:id]', ()=>{
    const updatepurchase:UpdatePurchaseDto={
        productId: 'updateProductId-3',
        cost: 1000,
        quantity:500,
    }
    return request(app.getHttpServer())
    .patch(`/purchase/${purchaseId.id}`)
    .send(updatepurchase as UpdatePurchaseDto)
    .then(() => {
     return request(app.getHttpServer())
          .get(`/purchase/${purchaseId.id}`)
          .then(({ body }) => {
            expect(body.productId).toEqual(updatepurchase.productId);
          });

    });
  });

  it('Delete one Customer [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete(`/purchase/${purchaseId.id}`)
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get(`/purchase/${purchaseId.id}`)
          .expect(HttpStatus.NOT_FOUND)
          .then(({body}) => {
            const expectedErrorMessage =  `Purchase #${purchaseId.id} not found`
            expect(body.message).toEqual(expectedErrorMessage);
        });
      })
  });




  afterAll(async () => {
    await app.close()
  })
});

