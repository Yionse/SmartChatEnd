import { Controller } from '@nestjs/common';
import { ContactServices } from './Contact.services';

@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactServices) {}
}
