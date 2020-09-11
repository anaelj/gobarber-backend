import ICreateTransportadoraDTO from '../dtos/ICreateTransportadoraDTO';
import Transportadora from '../infra/typeorm/entities/Transportadora';

export default interface ITransportadorasRepository {
  findById(id: string): Promise<Transportadora | undefined>;
  findByEmail(email: string): Promise<Transportadora | undefined>;
  findAllTransportadoras(id_except: string): Promise<Transportadora[]>;
  create(data: ICreateTransportadoraDTO): Promise<Transportadora>;
  save(Transportadora: Transportadora): Promise<Transportadora>;
}

// ,
//     name?: string,
//     email?: string,
