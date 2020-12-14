import { inject, injectable } from 'tsyringe';
import Transportadora from '@modules/transportadoras/infra/typeorm/entities/Transportadora';
import ITransportadorasRepository from '@modules/transportadoras/repositories/ITransportadorasRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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
    const transportadoras = await this.transportadorasRepository.findAllTransportadoras(
      transportadora_id,
    );

    return transportadoras;
  }
}

export default ListProviderService;
