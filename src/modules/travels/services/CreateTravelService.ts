import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Travel from '../infra/typeorm/entities/Travels';
import ITravelsRepository from '../repositories/ITravelsRepository';

interface IRequest {
  cte: string;
  numeroviagem: string;
  data: Date;
  origem: string;
  destino: string;
  mercadoria: string;
  placa: string;
  cpfmotorista: string;
  transportadora_id: string;
}
@injectable()
class CreateTravelService {
  constructor(
    @inject('TravelsRepository')
    private travelsRepository: ITravelsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    cte,
    numeroviagem,
    data,
    origem,
    destino,
    mercadoria,
    placa,
    cpfmotorista,
    transportadora_id,
  }: IRequest): Promise<Travel> {
    const checkTravelExists = await this.travelsRepository.findTravelByCte({
      cte,
      transportadora_id,
    });

    if (checkTravelExists) {
      throw new AppError('Travel already exists.');
    }

    const travel = await this.travelsRepository.create({
      cte,
      numeroviagem,
      data,
      origem,
      destino,
      mercadoria,
      placa,
      cpfmotorista,
      transportadora_id,
    });

    await this.cacheProvider.invalidadePrefix('travel-list-drivert');

    return travel;
  }
}

export default CreateTravelService;
