import { getRepository, Repository } from 'typeorm';
import ITravelsRepository from '@modules/travels/repositories/ITravelsRepository';
import IFindTravelByCteDTO from '@modules/travels/dtos/IFindTravelByCteDTO';
import ICreateTravelsDTO from '@modules/travels/dtos/ICreateTravelsDTO';
import IFindTravelByNumeroViagemDTO from '@modules/travels/dtos/IFindTravelByNumeroViagemDTO';
import Travel from '../entities/Travels';

class TravelsRepository implements ITravelsRepository {
  private ormRepository: Repository<Travel>;

  constructor() {
    this.ormRepository = getRepository(Travel);
  }

  public async findTravelByCte({
    cte,
    transportadora_id,
  }: IFindTravelByCteDTO): Promise<Travel | undefined> {
    const findTravel = await this.ormRepository.findOne({
      where: { cte, transportadora_id },
    });

    return findTravel;
  }

  public async findTravelByNumeroViagem({
    numeroviagem,
    transportadora_id,
  }: IFindTravelByNumeroViagemDTO): Promise<Travel | undefined> {
    const findTravel = await this.ormRepository.findOne({
      where: { numeroviagem, transportadora_id },
    });

    return findTravel;
  }

  public async findAllTravelsFromDriver(
    cpfmotorista: string,
  ): Promise<Travel[]> {
    const travel = await this.ormRepository.find({
      where: {
        cpfmotorista,
      },
    });

    return travel;
  }

  public async create(travelData: ICreateTravelsDTO): Promise<Travel> {
    const travel = this.ormRepository.create(travelData);
    await this.ormRepository.save(travel);

    return travel;
  }
}

export default TravelsRepository;
