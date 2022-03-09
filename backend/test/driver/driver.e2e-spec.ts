import { UpdateDriverDto } from './../../src/driver/dto/update-driver.dto';
import { CreateDriverDto } from './../../src/driver/dto/create-driver.dto';
import { DriverModule } from './../../src/driver/driver.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe,HttpServer,HttpStatus } from '@nestjs/common';
import * as request from 'supertest';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  const driver = {
    name: 'driver1',
    contact: '123 street',
    username:"driver-5",
    password:"pas123",
    device:"mobile phone"
 
  };
  let registeredDriver = {
    id:"id"
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DriverModule,
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
  describe('Create Driver [POST /]',()=>{
    it('should return new driver object', ()=>{
        return request(app.getHttpServer())
        .post('/driver')
        .send(driver as CreateDriverDto)
        .expect(HttpStatus.CREATED)
        .then(({body}) => {
          const expectedDriver = expect.objectContaining({...driver,password:expect.anything()})
          registeredDriver = {

            id:body._id,
          }
          expect(body).toEqual(expectedDriver);
        });
      });

    it('should return CONFLICT and send ERROR_MESSAGE, when driver already exits ', ()=>{
        return request(app.getHttpServer())
        .post('/driver')
        .send(driver as CreateDriverDto)
        .expect(HttpStatus.CONFLICT)
        .then(({body}) => {
          const expectErrorMessage = 'username already exist!'
          expect(body.message).toEqual(expectErrorMessage);
        });
    });

  })


  it('FindAll Driver [GET /]', ()=>{
    return request(app.getHttpServer())
    .get('/driver')
    .send(driver as CreateDriverDto)
    .expect(HttpStatus.OK)
    .then(({body}) => {
      const expectedDriver = {
        name:driver.name,
        contact: driver.contact,
        username:driver.username,
      }
      const dataBody={
        name: body[body.length-1].name,
        contact:body[body.length-1].contact,
        username:body[body.length-1].username,
      }
      expect(body.length).toBeGreaterThan(0);
      expect(dataBody).toEqual(expectedDriver);
    });
  });

  describe('FindOne Driver [GET /:id]',()=>{
    it('should return an driver object', ()=>{
        return request(app.getHttpServer())
        .get(`/driver/${registeredDriver.id}`)
        .expect(HttpStatus.OK)
        .then(({body}) => {
          const expecteddriver = expect.objectContaining({...driver,password:expect.anything()})
         expect(body).toEqual(expecteddriver);
        });
      });
      it('should return NOT_FOUND and ERROR_MESSAGE, when driverId is not exist', ()=>{
          const errordriverId = "ERROR_ID"
        return request(app.getHttpServer())
        .get(`/driver/${errordriverId}`)
        .expect(HttpStatus.NOT_FOUND)
        .then(({body}) => {
            const expectedErrorMessage =  `Driver #${errordriverId} not found`
            expect(body.message).toEqual(expectedErrorMessage);
        });
      });
  })

  it('Update Driver [Patch /:id]', ()=>{
    const updatedriver:UpdateDriverDto={
        name: 'registeddriver1',
        contact: '2314 street',
        username:"registeddriver-5",
    }
    return request(app.getHttpServer())
    .patch(`/driver/${registeredDriver.id}`)
    .send(updatedriver as UpdateDriverDto)
    .then(() => {
     return request(app.getHttpServer())
          .get(`/driver/${registeredDriver.id}`)
          .then(({ body }) => {
            expect(body.name).toEqual(updatedriver.name);
          });

    });
  });

  it('Delete one Driver [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete(`/driver/${registeredDriver.id}`)
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get(`/driver/${registeredDriver.id}`)
          .expect(HttpStatus.NOT_FOUND)
          .then(({body}) => {
            const expectedErrorMessage =  `Driver #${registeredDriver.id} not found`
            expect(body.message).toEqual(expectedErrorMessage);
        });
      })
  });

  afterAll(async () => {
    await app.close()
  })
});

