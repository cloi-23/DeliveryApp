import { UpdateManagerDto } from './../../src/manager/dto/update-manager.dto';
import { CreateManagerDto } from './../../src/manager/dto/create-manager.dto';
import { ManagerModule } from './../../src/manager/manager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe,HttpServer,HttpStatus } from '@nestjs/common';
import * as request from 'supertest';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  const manager = {
    name: 'manager1',
    contact: '123 registeredManager1 street',
    username:"manager-5",
    password:"pas123"
 
  };
  let registeredManager = {
    id:"id"
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ManagerModule,
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
  describe('Create Manager [POST /]',()=>{
    it('should return new manager object', ()=>{
        return request(app.getHttpServer())
        .post('/manager')
        .send(manager as CreateManagerDto)
        .expect(HttpStatus.CREATED)
        .then(({body}) => {
          const expectedManager = expect.objectContaining({...manager,password:expect.anything()})
          registeredManager = {

            id:body._id,
          }
          expect(body).toEqual(expectedManager);
        });
      });

    it('should return CONFLICT and send ERROR_MESSAGE, when manager already exits ', ()=>{
        return request(app.getHttpServer())
        .post('/manager')
        .send(manager as CreateManagerDto)
        .expect(HttpStatus.CONFLICT)
        .then(({body}) => {
          const expectErrorMessage = 'username already exist!'
          expect(body.message).toEqual(expectErrorMessage);
        });
    });

  })


  it('FindAll Manager [GET /]', ()=>{
    return request(app.getHttpServer())
    .get('/manager')
    .send(manager as CreateManagerDto)
    .expect(HttpStatus.OK)
    .then(({body}) => {
      const expectedManager = {
        name:manager.name,
        contact: manager.contact,
        username:manager.username,
      }
      const dataBody={
        name: body[body.length-1].name,
        contact:body[body.length-1].contact,
        username:body[body.length-1].username,
      }
      expect(body.length).toBeGreaterThan(0);
      expect(dataBody).toEqual(expectedManager);
    });
  });

  describe('FindOne Manager [GET /:id]',()=>{
    it('should return an manager object', ()=>{
        return request(app.getHttpServer())
        .get(`/manager/${registeredManager.id}`)
        .expect(HttpStatus.OK)
        .then(({body}) => {
          const expectedmanager = expect.objectContaining({...manager,password:expect.anything()})
         expect(body).toEqual(expectedmanager);
        });
      });
      it('should return NOT_FOUND and ERROR_MESSAGE, when managerId is not exist', ()=>{
          const errorManagerId = "ERROR_ID"
        return request(app.getHttpServer())
        .get(`/manager/${errorManagerId}`)
        .expect(HttpStatus.NOT_FOUND)
        .then(({body}) => {
            const expectedErrorMessage =  `Manager #${errorManagerId} not found`
            expect(body.message).toEqual(expectedErrorMessage);
        });
      });
  })

  it('Update Manager [Patch /:id]', ()=>{
    const updatemanager:UpdateManagerDto={
        name: 'registedManager1',
        contact: '2314 street',
        username:"registedManager-5",
    }
    return request(app.getHttpServer())
    .patch(`/manager/${registeredManager.id}`)
    .send(updatemanager as UpdateManagerDto)
    .then(() => {
     return request(app.getHttpServer())
          .get(`/manager/${registeredManager.id}`)
          .then(({ body }) => {
            expect(body.name).toEqual(updatemanager.name);
          });

    });
  });

  it('Delete one Manager [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete(`/manager/${registeredManager.id}`)
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get(`/manager/${registeredManager.id}`)
          .expect(HttpStatus.NOT_FOUND)
          .then(({body}) => {
            const expectedErrorMessage =  `Manager #${registeredManager.id} not found`
            expect(body.message).toEqual(expectedErrorMessage);
        });
      })
  });

  afterAll(async () => {
    await app.close()
  })
});

