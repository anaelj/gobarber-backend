import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Driver from '../infra/typeorm/entities/Drivers';
import IDriversRepository from '../repositories/IDriversRepository';

interface IRequest {
  name: string;
  cpf: string;
}
@injectable()
class CreateDriverService {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, cpf }: IRequest): Promise<Driver> {
    const checkDriverExists = await this.driversRepository.findDriverByCPF(cpf);

    if (checkDriverExists) {
      throw new AppError('Driver already exists.');
    }

    const driver = await this.driversRepository.create({
      name,
      cpf,
    });

    //    await this.cacheProvider.invalidadePrefix('Drivers-list');

    return driver;
  }
}

export default CreateDriverService;
