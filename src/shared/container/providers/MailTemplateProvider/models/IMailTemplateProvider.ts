import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTOS';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
