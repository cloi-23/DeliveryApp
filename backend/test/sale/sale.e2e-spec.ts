import { UpdateSalesDto } from './../../src/sales/dto/update-sales-dto';
import { CreateSalesDto } from './../../src/sales/dto/create-sales-dto';
import { SalesModule } from './../../src/sales/sales.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe,HttpServer,HttpStatus } from '@nestjs/common';
import * as request from 'supertest';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  const sale = {
    orderId: 'orderId-2',
    date: "2022-03-09T08:59:20.000Z",
 
  };
  let saleId = {
    id:"id"
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SalesModule,
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
  
  describe('Create Sale [POST /]',()=>{
    it('should return new sale object', ()=>{
        return request(app.getHttpServer())
        .post('/sales')
        .send(sale as CreateSalesDto)
        .expect(HttpStatus.CREATED)
        .then(({body}) => {
          const expectedSale = sale.orderId
          saleId={
            id:body._id,
          }
          expect(body.orderId).toEqual(expectedSale);
        });
      });

  })


  it('FindAll Sale [GET /]', ()=>{
    return request(app.getHttpServer())
    .get('/sales')
    .send(sale as CreateSalesDto)
    .expect(HttpStatus.OK)
    .then(({body}) => {
      const expectedSale = {
        orderId: sale.orderId,
        date:sale.date
      }
      const dataBody={
        orderId: body[body.length-1].orderId,
        date:body[body.length-1].date,
      }
      expect(body.length).toBeGreaterThan(0);
      expect(dataBody).toEqual(expectedSale);
    });
  });

  describe('FindOne Sale [GET /:id]',()=>{
    it('should return an sale object', ()=>{
        return request(app.getHttpServer())
        .get(`/sales/${saleId.id}`)
        .expect(HttpStatus.OK)
        .then(({body}) => {
          const expectedSale = expect.objectContaining(sale)
         expect(body).toEqual(expectedSale);
        });
      });
      it('should return NOT_FOUND and ERROR_MESSAGE, when saleIdId is not exist', ()=>{
          const errorSaleId = "ERROR_ID"
        return request(app.getHttpServer())
        .get(`/sales/${errorSaleId}`)
        .expect(HttpStatus.NOT_FOUND)
        .then(({body}) => {
            const expectedErrorMessage =  `Sale #${errorSaleId} not found`
            expect(body.message).toEqual(expectedErrorMessage);
        });
      });
  })

  it('Update Sale [Patch /:id]', ()=>{
    const updateSale:UpdateSalesDto={
        orderId: 'updateOrderId-2',
        date: "2021-04-09T08:59:20.000Z",
    }
    return request(app.getHttpServer())
    .patch(`/sales/${saleId.id}`)
    .send(updateSale as UpdateSalesDto)
    .then(() => {
     return request(app.getHttpServer())
          .get(`/sales/${saleId.id}`)
          .then(({ body }) => {
            expect(body.orderId).toEqual(updateSale.orderId);
          });

    });
  });

  it('Delete one Sale [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete(`/sales/${saleId.id}`)
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get(`/sales/${saleId.id}`)
          .expect(HttpStatus.NOT_FOUND)
          .then(({body}) => {
            const expectedErrorMessage =  `Sale #${saleId.id} not found`
            expect(body.message).toEqual(expectedErrorMessage);
        });
      })
  });

  afterAll(async () => {
    await app.close()
  })
});

