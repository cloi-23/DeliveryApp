import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Model } from 'mongoose'
import { getModelToken } from '@nestjs/mongoose';
type MockRepository<T = any> = Partial<Record<keyof Model<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T>  => ({
  findOne: jest.fn(),
  create: jest.fn(),
});
describe('CustomerService', () => {
  let service: CustomerService;
  let customerModel:MockRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService,
        {
          provide:getModelToken('Customer'),useValue: createMockRepository()
        },
      ],
     
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    customerModel = module.get<MockRepository>(getModelToken('Customer'))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // FindOne method

describe('FindOne', () => {
  //let service: CofeesService;
  describe('when customer with ID exists',()=>{
    it('should return the coffee object',
     async()=>{
       const cid = "6226f4e610f8f39d07fdbbdc"
       const expectOutput={}

       customerModel.findOne.mockReturnValue(expectOutput)
       const coffee = await service.findOne(cid)
       console.log(coffee);
       
       expect(coffee).toEqual(expectOutput)
    })
  })
});

  // FindOne method

  describe('FindOne', () => {
    //let service: CofeesService;
    describe('when customer with ID exists',()=>{
      it('should return the customer object',
       async()=>{
         const cid = "342345"
         const expectOutput={}
  
         customerModel.findOne.mockReturnValue(expectOutput)
         const customer = await service.findOne(cid)
         //console.log(customer);
         
         expect(customer).toEqual(expectOutput)
      })
    })
    describe('otherwise',()=>{
      it('should throw the "HttpException" with status of 404',
        async () => {
        const cid = "1"
        customerModel.findOne.mockReturnValue(undefined)
        try {
          await service.findOne(cid)
        } catch (error) {
          console.log(error.message);
          
          expect(error.status).toEqual(404)
          expect(error.message).toEqual(`Coffee #${cid} not Found`)
        }
      })
  
    })
  });

});
