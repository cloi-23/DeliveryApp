import { LoginCustomerDto } from './../../src/customer/dto/login-cutomer.dto';
import { UpdateCustomerDto } from './../../src/customer/dto/update-customer.dto';
import { CreateCustomerDto } from './../../src/customer/dto/create-customer.dto';
import { CustomerModule } from './../../src/customer/customer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe,HttpServer,HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt'

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const customer = {
    name: 'test2',
    address: '123 test street',
    contact:'12455',
    username:'test-26',
    password:'test123',
  };
  let registeredCustomer = {
    id:"id",
    username:"",
    password:""
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule,
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


  
  describe('Create Customer [POST /]',()=>{
    it('should return new customer object', ()=>{
      return request(app.getHttpServer())
      .post('/customer')
      .send(customer as CreateCustomerDto)
      .expect(HttpStatus.CREATED)
      .then(({body}) => {
        const expectedCustomer = expect.objectContaining({...customer,password:expect.anything()})
        registeredCustomer={
          id:body._id,
          username:body.username,
          password:body.password
        }
        expect(body).toEqual(expectedCustomer);
      });
    });

    it('should return CONFLICT and send ERROR_MESSAGE, when username already exits ', ()=>{
      return request(app.getHttpServer())
      .post('/customer')
      .send(customer as CreateCustomerDto)
      .expect(HttpStatus.CONFLICT)
      .then(({body}) => {
        const expectErrorMessage =  'username already exist!'
        expect(body.message).toEqual(expectErrorMessage)
        
      });
    });

  })

// describe('Validate Customer',()=>{
// const validCustomer={
//   username:customer.username,
//   password:customer.password
// }

// it('should return "false" if password is Not Match',async ()=>{
//   const response = await request(app.getHttpServer())
//   .post('/customer/login')
//   .send(validCustomer)
//   console.log(response.body);
  
//   });
  // it('should return "true" if password is Match', ()=>{
  //   return request(app.getHttpServer())
  //   .post('/customer/login')
  //   .send(validCustomer as LoginCustomerDto)
  //   .then(() => {
  //     bcrypt.compare(validCustomer.password, registeredCustomer.password)
  //     .then(isMatch=>{
  //     expect(isMatch).toEqual(true);
  //     })
  //   });
  // });

  // it('should return "false" if password is Not Match', ()=>{
  //   return request(app.getHttpServer())
  //   .post('/customer/login')
  //   .send(validCustomer as LoginCustomerDto)
  //   // .expect(HttpStatus.OK)
  //   .then(({body}) => {
  //     console.log(body);
      
  //     const errorPassword ="error"
  //     bcrypt.compare(errorPassword, registeredCustomer.password)
  //     .then(isMatch=>{
  //     expect(isMatch).toEqual(false);

  //     })
  //   });
  // });
 

 

// })

  it('FindAll Customer [GET /]', ()=>{
    return request(app.getHttpServer())
    .get('/customer')
    .send(customer as CreateCustomerDto)
    .expect(HttpStatus.OK)
    .then(({body}) => {
      const expectedCustomer = {
        name: customer.name,
        address:customer.address,
        contact:customer.contact,
        username:customer.username,
      }
      const dataBody={
        name: body[body.length-1].name,
        address:body[body.length-1].address,
        contact:body[body.length-1].contact,
        username:body[body.length-1].username,
      }
      expect(body.length).toBeGreaterThan(0);
      expect(dataBody).toEqual(expectedCustomer);
    });
  });


  describe('FindOne Customer [GET /:id]',()=>{
    it('should return an custmer object', ()=>{
        return request(app.getHttpServer())
        .get(`/customer/${registeredCustomer.id}`)
        .send(customer as CreateCustomerDto)
        .expect(HttpStatus.OK)
        .then(({body}) => {
            const expectedCustomer = expect.objectContaining({...customer,password:expect.anything()})
            expect(body).toEqual(expectedCustomer);
          });
      });
      it('should return NOT_FOUND and ERROR_MESSAGE, when prodId is not exist', ()=>{
        const errorCustomerId = "ERROR_ID"
        return request(app.getHttpServer())
        .get(`/customer/${errorCustomerId}`)
        .expect(HttpStatus.NOT_FOUND)
        .then(({body}) => {
            const expectedErrorMessage =  `Customer #${errorCustomerId} not found`
            expect(body.message).toEqual(expectedErrorMessage);
        });
      });
  })

  it('Update Customer [Patch /:id]', ()=>{
    const updateCustomer:UpdateCustomerDto={
      name: 'updateTest',
      address: '123 update street',
      contact:'054844',
      username:'update-24',
  
    }
    return request(app.getHttpServer())
    .patch(`/customer/${registeredCustomer.id}`)
    .send(updateCustomer as UpdateCustomerDto)
    .then(() => {
     return request(app.getHttpServer())
          .get(`/customer/${registeredCustomer.id}`)
          .then(({ body }) => {
            expect(body.name).toEqual(updateCustomer.name);
          });

    });
  });

  it('Delete one Customer [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete(`/customer/${registeredCustomer.id}`)
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get(`/customer/${registeredCustomer.id}`)
          .expect(HttpStatus.NOT_FOUND)
          .then(({body}) => {
            const expectedErrorMessage =  `Customer #${registeredCustomer.id} not found`
            expect(body.message).toEqual(expectedErrorMessage);
        });
      })
  });

  afterAll(async () => {
    await app.close()
  })
});

