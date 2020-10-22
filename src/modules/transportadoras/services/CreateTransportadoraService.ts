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
}
@injectable()
class CreateTransportadoraService {
  constructor(
    @inject('TransportadorasRepository')
    private TransportadorasRepository: ITransportadorasRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  
  public async execute({
    name,
    email,
    telefone,
    contato,
  }: IRequest): Promise<Transportadora> {
    const checkTransportadoraExists = await this.TransportadorasRepository.findByEmail(
      email,
    );

    if (checkTransportadoraExists) {
      throw new AppError('Email address already used.');
    }

    const transportadora = await this.TransportadorasRepository.create({
      name,
      email,
      telefone,
      contato,
    });

    await this.cacheProvider.invalidadePrefix('transportadoras-list');

    return transportadora;
  }
}

export default CreateTransportadoraService;
