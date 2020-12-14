import ICreateTravelsDTO from '@modules/travels/dtos/ICreateTravelsDTO';
import Travel from '../infra/typeorm/entities/Travels';
import IFindTravelByCteDTO from '../dtos/IFindTravelByCteDTO';

export default interface ITravelsRepository {
  create(data: ICreateTravelsDTO): Promise<Travel>;
  findAllTravelsFromDriver(cpfmotorista: string): Promise<Travel[]>;
  findTravelByCte(data: IFindTravelByCteDTO): Promise<Travel | undefined>;
}
