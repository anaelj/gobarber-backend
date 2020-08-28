import ICreateTransportadoraDTO from '../dtos/ICreateTransportadoraDTO';
import Transportadora from '../infra/typeorm/entities/Transportadora';

export default interface ITransportadorasRepository {
  findById(id: string): Promise<Transportadora | undefined>;
  findByEmail(email: string): Promise<Transportadora | undefined>;
  create(data: ICreateTransportadoraDTO): Promise<Transportadora>;
  save(Transportadora: Transportadora): Promise<Transportadora>;
}
