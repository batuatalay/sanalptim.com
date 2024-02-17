import { PartialType } from '@nestjs/mapped-types';
import { CreateClientPropertyDto } from './clientProperty.dto';

export class UpdateClientPropertyDto extends PartialType(CreateClientPropertyDto) {}
