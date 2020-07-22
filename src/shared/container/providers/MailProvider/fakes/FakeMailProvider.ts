import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  subject: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  public async sendMail(
    to: string,
    subject: string,
    body: string,
  ): Promise<void> {
    this.messages.push({
      to,
      subject,
      body,
    });
  }
}
