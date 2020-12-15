import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import IDriversRepository from '../repositories/IDriversRepository';
import Driver from '../infra/typeorm/entities/Drivers';

interface IRequest {
  name: string;
  cpf: string;
}

@injectable()
class ListDriversService {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, cpf }: IRequest): Promise<Driver[]> {
    // desativei o cache porque porque ainda nao sei como fazer like e o or no cache

    // let drivers = await this.cacheProvider.recover<Driver[]>(
    //   `Driver-list-driver:${cpf}`,
    // );

    //    if (!drivers) {
    const drivers = await this.driversRepository.findAllDrivers({ name, cpf });

    // await this.cacheProvider.save(
    //   `Driver-list-driver:${cpf}`,
    //   classToClass(drivers),
    // );
    //    }

    return drivers;
  }
}

export default ListDriversService;
