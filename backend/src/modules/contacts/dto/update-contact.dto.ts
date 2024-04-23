import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The first name of a contact',
    default: 'John',
  })
  firstname?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The last name of a contact',
    default: 'Doe',
  })
  lastname?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'The email of a contact',
    default: 'john.doe@gmail.com',
  })
  email?: string;
}
