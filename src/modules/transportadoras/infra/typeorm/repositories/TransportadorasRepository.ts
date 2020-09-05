import { getRepository, Repository, Like, Not, Or } from 'typeorm';
import ITransportadorasRepository from '@modules/transportadoras/repositories/ITransportadorasRepository';
import ICreateTransportadoraDTO from '@modules/transportadoras/dtos/ICreateTransportadoraDTO';
import Transportadora from '../entities/Transportadora';

class TransportadorasRepository implements ITransportadorasRepository {
  private ormRepository: Repository<Transportadora>;

  constructor() {
    this.ormRepository = getRepository(Transportadora);
  }

  public async findById(id: string): Promise<Transportadora | undefined> {
    const transportadora = await this.ormRepository.findOne(id);
    return transportadora;
  }

  public async findByEmail(email: string): Promise<Transportadora | undefined> {
    const transportadora = await this.ormRepository.findOne({
      where: { email },
    });
    return transportadora;
  }

  public async findAll(
    id_except: string,
    name?: string,
    email?: string,
  ): Promise<Transportadora | undefined> {
    const transportadora = await this.ormRepository.findOne({
      where: [
        { id: Not(id_except) },
        [{ name: Or(Like(name)) }, { email: Or(Like(email)) }],
      ],
      //      where: { id: Not(id_except), [{name: Or(Like(name))}, {email: Or(Like(email))} ] },
    });
    return transportadora;
  }

  public async create(
    transportadoraData: ICreateTransportadoraDTO,
  ): Promise<Transportadora> {
    const transportadora = this.ormRepository.create(transportadoraData);
    await this.ormRepository.save(transportadora);

    return transportadora;
  }

  public async save(transportadora: Transportadora): Promise<Transportadora> {
    return this.ormRepository.save(transportadora);
  }
}

export default TransportadorasRepository;
