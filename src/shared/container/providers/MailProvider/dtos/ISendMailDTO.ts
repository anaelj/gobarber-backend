import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTOS';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
