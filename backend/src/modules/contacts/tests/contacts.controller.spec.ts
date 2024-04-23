import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from '../contacts.controller';
import { ContactsService } from '../contacts.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Contact } from '../entities/contact.entity';
import { Repository } from 'typeorm';
import { repositoryMockFactory } from '../mocks/repository.mock';
import { MockType } from 'src/types';

describe('ContactsController', () => {
  let controller: ContactsController;
  let service: ContactsService;
  let repositoryMock: MockType<Repository<Contact>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        ContactsService,
        { provide: getRepositoryToken(Contact), useFactory: repositoryMockFactory }
      ],

    }).compile();

    controller = module.get<ContactsController>(ContactsController);
    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
