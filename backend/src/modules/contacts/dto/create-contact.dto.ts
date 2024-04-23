import { IsEmail, IsString } from "class-validator";
import { Contact } from "../entities/contact.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateContactDto implements Omit<Contact, 'id'> {
  @IsString()
  @ApiProperty({
    description: 'The first name of a contact',
    default: 'John',
  })
  firstname: string;

  @IsString()
  @ApiProperty({
    description: 'The last name of a contact',
    default: 'Doe',
  })
  lastname: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email of a contact',
    default: 'john.doe@gmail.com',
  })
  email: string;
}
