import { inject, injectable } from 'tsyringe';
import Transportadora from '@modules/transportadoras/infra/typeorm/entities/Transportadora';
import ITransportadorasRepository from '@modules/transportadoras/repositories/ITransportadorasRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
  transportadora_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('TransportadorasRepository')
    private transportadorasRepository: ITransportadorasRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    transportadora_id,
  }: IRequest): Promise<Transportadora[]> {
    // let Transportadoras = await this.cacheProvider.recover<Transportadora[]>(
    //   `providers-list:${Transportadora_id}`,
    // );

    const transportadoras = await this.transportadorasRepository.findAllTransportadoras(
      transportadora_id,
    );

    await this.cacheProvider.save(
      `providers-list:${transportadora_id}`,
      classToClass(transportadoras),
    );
    // }

    return transportadoras;
  }
}

export default ListProviderService;
