import { StringField } from '../../decorators/field.decorators.ts';

export class CreateTranslationDto {
  @StringField()
  text!: string;
}
