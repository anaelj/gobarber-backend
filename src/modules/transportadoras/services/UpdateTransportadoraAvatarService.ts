import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Transportadora from '../infra/typeorm/entities/Transportadora';
import ITransportadorasRepository from '../repositories/ITransportadorasRepository';

interface IRequest {
  transportadora_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateTransportadoraAvatarService {
  constructor(
    @inject('transportadorasRepository')
    private transportadorasRepository: ITransportadorasRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    transportadora_id,
    avatarFilename,
  }: IRequest): Promise<Transportadora> {
    const transportadora = await this.transportadorasRepository.findById(
      transportadora_id,
    );
    await this.cacheProvider.invalidade(`providers-list:${transportadora_id}`);

    if (!transportadora) {
      throw new AppError(
        'Only authenticated transportadoras can change avatar.',
        401,
      );
    }

    if (transportadora.avatar) {
      await this.storageProvider.deleteFile(transportadora.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    transportadora.avatar = filename;

    await this.transportadorasRepository.save(transportadora);

    return transportadora;
  }
}

export default UpdateTransportadoraAvatarService;
