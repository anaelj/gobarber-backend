import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import ITravelsRepository from '../repositories/ITravelsRepository';
import Travel from '../infra/typeorm/entities/Travels';

interface IRequest {
  cpfmotorista: string;
}

@injectable()
class ListTravelsService {
  constructor(
    @inject('TravelsRepository')
    private travelsRepository: ITravelsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ cpfmotorista }: IRequest): Promise<Travel[]> {
    // let travels = await this.cacheProvider.recover<Travel[]>(
    //   `travel-list-driver:${cpfmotorista}`,
    // );

    // if (!travels) {
    const travels = await this.travelsRepository.findAllTravelsFromDriver(
      cpfmotorista,
    );

    //   await this.cacheProvider.save(
    //     `travel-list-driver:${cpfmotorista}`,
    //     classToClass(travels),
    //   );
    // }

    return travels;
  }
}

export default ListTravelsService;
