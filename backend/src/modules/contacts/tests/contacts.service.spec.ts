import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from '../contacts.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Contact } from '../entities/contact.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { repositoryMockFactory } from '../mocks/repository.mock';
import { MockType } from 'src/types';
import { NotFoundException } from '@nestjs/common';
import { identity } from 'rxjs';

describe('ContactsService', () => {
  let service: ContactsService;
  let repositoryMock: MockType<Repository<Contact>>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        { provide: getRepositoryToken(Contact), useFactory: repositoryMockFactory }
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
    repositoryMock = module.get(getRepositoryToken(Contact));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create contact', async () => {
    const contact: Contact = {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@gmail',
    };

    repositoryMock.save.mockReturnValue(contact);
    expect(await service.create(contact)).toEqual(contact);
  })

  it('should find all contacts', async () => {
    const contacts: Contact[] = [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@gmail',
      },
      {
        id: 2,
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jane.doe@gmail',
      },
    ];

    repositoryMock.find.mockReturnValue(contacts);
    expect(await service.findAll()).toEqual(contacts);
  })

  it('should find one contact', async () => {
    const contact: Contact = {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@gmail',
    };

    repositoryMock.findOneOrFail.mockReturnValue(contact);
    expect(await service.findOne(contact.id)).toEqual(contact);
  })

  it('should not find contact', async () => {
    const contactId = 9999;
    const notFoundEntity = new EntityNotFoundError(Contact, {
      where: { id: contactId }
    });

    repositoryMock.findOneOrFail.mockImplementation(() => {
      throw notFoundEntity;
    });
    await expect(service.findOne(contactId)).rejects.toThrow(new NotFoundException(notFoundEntity));
  })

  it('should update contact', async () => {
    const contact: Contact = {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@gmail',
    };

    const updatePayload = {
      firstname: 'Jane'
    };
    const idToUpdate = 1;

    repositoryMock.findOneOrFail.mockReturnValue(contact);
    repositoryMock.save.mockReturnValue({
      ...updatePayload,
      id: idToUpdate
    });

    expect(await service.update(idToUpdate, updatePayload)).toEqual({
      id: idToUpdate,
      ...updatePayload
    });
  })


  it('should not update contact', async () => {
    const idToUpdate = 9999;
    const updatePayload = {
      firstname: 'Jane'
    };

    const notFoundError = new EntityNotFoundError(Contact, { where: { id: idToUpdate } })
    repositoryMock.findOneOrFail.mockImplementation(() => {
      throw notFoundError;
    })

    await expect(service.update(idToUpdate, updatePayload)).rejects.toThrow(new NotFoundException(notFoundError));
  })

  it('should delete contact', async () => {
    const contact: Contact = {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@gmail',
    };

    repositoryMock.delete.mockReturnValue({ affected: 1 });
    repositoryMock.findOneOrFail.mockReturnValue(contact);

    expect(await service.delete(contact.id)).toBeUndefined()
  })

  it('should not delete contact', async () => {
    const idToDelete = 9999;
    const notFoundError = new EntityNotFoundError(Contact, { where: { id: idToDelete } })

    repositoryMock.delete.mockImplementation(() => {
      throw notFoundError
    })

    await expect(service.delete(idToDelete)).rejects.toThrow(new NotFoundException(notFoundError))
  })
});
