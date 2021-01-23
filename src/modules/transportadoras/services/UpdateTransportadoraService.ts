import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Transportadora from '../infra/typeorm/entities/Transportadora';
import ITransportadorasRepository from '../repositories/ITransportadorasRepository';

interface IRequest {
  transportadora_id: string;
  name: string;
  email: string;
  telefone: string;
  contato: string;
  status: string;
}

@injectable()
class UpdateTransportadoraService {
  constructor(
    @inject('TransportadorasRepository')
    private transportadorasRepository: ITransportadorasRepository,
  ) {}

  public async execute({
    transportadora_id,
    name,
    email,
    telefone,
    contato,
    status,
  }: IRequest): Promise<Transportadora> {
    const transportadora = await this.transportadorasRepository.findById(
      transportadora_id,
    );

    if (!transportadora) {
      throw new AppError('Transportadora not found');
    }

    const transportadoraWithUpdateEmail = await this.transportadorasRepository.findByEmail(
      email,
    );

    if (
      transportadoraWithUpdateEmail &&
      transportadoraWithUpdateEmail.id !== transportadora_id
    ) {
      throw new AppError('E-mail already in use.');
    }

    transportadora.name = name;
    transportadora.email = email;
    transportadora.telefone = telefone;
    transportadora.contato = contato;
    transportadora.status = status;
    return this.transportadorasRepository.save(transportadora);
  }
}

export default UpdateTransportadoraService;
