import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Transportadora from '../infra/typeorm/entities/Transportadora';
import ITransportadorasRepository from '../repositories/ITransportadorasRepository';

interface IRequest {
  transportadora_id: string;
}

@injectable()
class ShowTransportadoraService {
  constructor(
    @inject('TransportadorasRepository')
    private TransportadorasRepository: ITransportadorasRepository,
  ) {}

  public async execute({
    transportadora_id,
  }: IRequest): Promise<Transportadora> {
    const transportadora = await this.TransportadorasRepository.findById(
      transportadora_id,
    );

    if (!transportadora) {
      throw new AppError('Transportadora not found');
    }

    return transportadora;
  }
}

export default ShowTransportadoraService;
