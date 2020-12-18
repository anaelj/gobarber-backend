import ICreateTravelsDTO from '@modules/travels/dtos/ICreateTravelsDTO';
import Travel from '../infra/typeorm/entities/Travels';
import IFindTravelByCteDTO from '../dtos/IFindTravelByCteDTO';
import IFindTravelByNumeroViagemDTO from '../dtos/IFindTravelByNumeroViagemDTO';

export default interface ITravelsRepository {
  create(data: ICreateTravelsDTO): Promise<Travel>;
  findAllTravelsFromDriver(cpfmotorista: string): Promise<Travel[]>;
  findTravelByCte(data: IFindTravelByCteDTO): Promise<Travel | undefined>;
  findTravelByNumeroViagem(
    data: IFindTravelByNumeroViagemDTO,
  ): Promise<Travel | undefined>;
}
