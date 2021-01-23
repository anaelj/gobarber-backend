import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Transportadora from '../infra/typeorm/entities/Transportadora';
import ITransportadorasRepository from '../repositories/ITransportadorasRepository';

interface IRequest {
  name: string;
  email: string;
  telefone: string;
  contato: string;
  status: string;
}
@injectable()
class CreateTransportadoraService {
  constructor(
    @inject('TransportadorasRepository')
    private transportadorasRepository: ITransportadorasRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    email,
    telefone,
    contato,
    status,
  }: IRequest): Promise<Transportadora> {
    const checkTransportadoraExists = await this.transportadorasRepository.findByEmail(
      email,
    );

    if (checkTransportadoraExists) {
      throw new AppError('Email address already used.');
    }

    const transportadora = await this.transportadorasRepository.create({
      name,
      email,
      telefone,
      contato,
      status,
    });

    await this.cacheProvider.invalidadePrefix('transportadoras-list');

    return transportadora;
  }
}

export default CreateTransportadoraService;
