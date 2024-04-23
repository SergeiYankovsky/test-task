import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) { }

  async create(createContactDto: CreateContactDto) {
    return this.contactsRepository.save(createContactDto);
  }

  async findOne(id: number) {
    return this.findContactOrFail(id);
  }

  async findAll() {
    return this.contactsRepository.find();
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    await this.findContactOrFail(id);

    return this.contactsRepository.save({
      id,
      ...updateContactDto
    });
  }

  async delete(id: number) {
    await this.findContactOrFail(id);

    await this.contactsRepository.delete(id);
  }

  private async findContactOrFail(id: number) {
    try {
      const contact = await this.contactsRepository.findOneOrFail({
        where: { id }
      });

      return contact;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error)
      }

      throw error;
    }
  }
}
