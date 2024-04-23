import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import {
  ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse,
  ApiNotFoundResponse, ApiOkResponse, ApiTags
} from '@nestjs/swagger';
import { Contact } from './entities/contact.entity';

@Controller({
  path: 'contacts',
  version: '1',
})
@ApiTags('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Create new contact', type: Contact })
  @ApiBadRequestResponse({ description: 'Bad request. The contact payload is invalid' })
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Return arrays of contacts' })
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Contact not found' })
  @ApiOkResponse({ description: 'Return contact by id', type: Contact })
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'Contact not found' })
  @ApiOkResponse({ description: 'Contact was updated successfully' })
  @ApiBadRequestResponse({ description: 'Bad request. The contact payload is invalid' })
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(+id, updateContactDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Contact was deleted successfully' })
  @ApiNotFoundResponse({ description: 'Contact not found' })
  delete(@Param('id') id: string) {
    return this.contactsService.delete(+id);
  }
}
