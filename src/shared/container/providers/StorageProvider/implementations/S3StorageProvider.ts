import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPah = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPah);

    if (!ContentType) {
      throw new Error('Erro ao verificar tipo do arquivo.');
    }

    // const fileContent = await fs.promises.readFile(originalPah, {
    //   encoding: 'utf-8',
    // }); // só pode colocar utf8 quando é arquivo text, imagem não pode

    const fileContent = await fs.promises.readFile(originalPah);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
        ContentDisposition: `inline; filename=${file}`,
      })
      .promise();
    await fs.promises.unlink(originalPah);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
