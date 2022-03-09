// import { DeliveryModule } from './../../src/delivery/delivery.module';
// import { CreateDeliveryDto } from './../../src/delivery/dto/create-delivery.dto';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication, ValidationPipe,HttpServer,HttpStatus } from '@nestjs/common';
// import * as request from 'supertest';


// describe('AppController (e2e)', () => {
//   let app: INestApplication;
//   const delivery = {
//     driverId: 'productId-4',
//     userId: "userId",
//     orderId:"orderId",
//     orderDate:new Date(),
//     status:"pending",
//     deliveredDate:new Date()
 
//   };
//   let deliveryId = {
//     id:"id"
//   }

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [DeliveryModule,
//         MongooseModule.forRoot('mongodb://localhost:27019/TestDeliveryApp'),
//         ],
//     }).compile();
//     app = moduleFixture.createNestApplication();
//     app.useGlobalPipes(
//         new ValidationPipe({
//           whitelist:true,
//           transform: true,
//           forbidNonWhitelisted:true,
//           transformOptions:{
//             enableImplicitConversion:true
//           }
//         })
//       )
//     await app.init();
//   });
//   it.todo('Create [POST /]');

// //   describe('Create Purchace [POST /]',()=>{
// //     console.log(delivery);
    
// //       it('should return new delivery object', ()=>{
// //         return request(app.getHttpServer())
// //         .post('/delivery')
// //         .send(delivery )
// //         .expect(HttpStatus.CREATED)
// //         .then(({body}) => {
// //           const expectedDelivery = expect.objectContaining(delivery)
// //           deliveryId={
// //             id:body._id,
// //           }
// //           expect(body).toEqual(expectedDelivery);
// //         });
// //       });

// //   })


// //   it('FindAll delivery [GET /]', ()=>{
// //     return request(app.getHttpServer())
// //     .get('/delivery')
// //     .send(delivery as CreatedeliveryDto)
// //     .expect(HttpStatus.OK)
// //     .then(({body}) => {
// //       const expecteddelivery = {
// //         productId: delivery.productId,
// //         cost:delivery.cost,
// //         quantity:delivery.quantity,
     
// //       }
// //       const dataBody={
// //         productId: body[body.length-1].productId,
// //         cost:body[body.length-1].cost,
// //         quantity:body[body.length-1].quantity,
// //       }
// //       expect(body.length).toBeGreaterThan(0);
// //       expect(dataBody).toEqual(expecteddelivery);
// //     });
// //   });

// //   describe('FindOne delivery [GET /:id]',()=>{
// //     it('should return an delivery object', ()=>{
// //         return request(app.getHttpServer())
// //         .get(`/delivery/${deliveryId.id}`)
// //         .expect(HttpStatus.OK)
// //         .then(({body}) => {
// //           const expecteddelivery = expect.objectContaining(delivery)
// //          expect(body).toEqual(expecteddelivery);
// //         });
// //       });
// //       it('should return NOT_FOUND and ERROR_MESSAGE, when deliveryIdId is not exist', ()=>{
// //           const errordeliveryIdId = "ERROR_ID"
// //         return request(app.getHttpServer())
// //         .get(`/delivery/${errordeliveryIdId}`)
// //         .expect(HttpStatus.NOT_FOUND)
// //         .then(({body}) => {
// //             const expectedErrorMessage =  `delivery #${errordeliveryIdId} not found`
// //             expect(body.message).toEqual(expectedErrorMessage);
// //         });
// //       });
// //   })

// //   it('Update Customer [Patch /:id]', ()=>{
// //     const updatedelivery:UpdatedeliveryDto={
// //         productId: 'updateProductId-3',
// //         cost: 1000,
// //         quantity:500,
// //     }
// //     return request(app.getHttpServer())
// //     .patch(`/delivery/${deliveryId.id}`)
// //     .send(updatedelivery as UpdatedeliveryDto)
// //     .then(() => {
// //      return request(app.getHttpServer())
// //           .get(`/delivery/${deliveryId.id}`)
// //           .then(({ body }) => {
// //             expect(body.productId).toEqual(updatedelivery.productId);
// //           });

// //     });
// //   });

// //   it('Delete one Customer [DELETE /:id]', () => {
// //     return request(app.getHttpServer())
// //       .delete(`/delivery/${deliveryId.id}`)
// //       .expect(HttpStatus.OK)
// //       .then(() => {
// //         return request(app.getHttpServer())
// //           .get(`/delivery/${deliveryId.id}`)
// //           .expect(HttpStatus.NOT_FOUND)
// //           .then(({body}) => {
// //             const expectedErrorMessage =  `delivery #${deliveryId.id} not found`
// //             expect(body.message).toEqual(expectedErrorMessage);
// //         });
// //       })
// //   });




//   afterAll(async () => {
//     await app.close()
//   })
// });

