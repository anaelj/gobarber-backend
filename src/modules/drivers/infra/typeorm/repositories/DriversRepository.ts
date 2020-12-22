import { getRepository, Repository, Like } from 'typeorm';
import IDriversRepository from '@modules/drivers/repositories/IDriversRepository';
import IDriversDTO from '@modules/drivers/dtos/IDriversDTO';
import Driver from '../entities/Drivers';

class DriversRepository implements IDriversRepository {
  private ormRepository: Repository<Driver>;

  constructor() {
    this.ormRepository = getRepository(Driver);
  }

  public async findDriverByCPF(
    cpfmotorista: string,
  ): Promise<Driver | undefined> {
    const findDriver = await this.ormRepository.findOne({
      where: { cpf: cpfmotorista },
    });

    return findDriver;
  }

  public async findAllDrivers({ name, cpf }: IDriversDTO): Promise<Driver[]> {
    //    console.log(name);
    //    console.log(cpf);

    const driver = await this.ormRepository.find({
      where: [{ name: Like(`%${name}%`) }, { cpf }],
      take: 100,
      order: { name: 'ASC' },
    });

    return driver;
  }

  public async create(data: IDriversDTO): Promise<Driver> {
    const driver = this.ormRepository.create(data);
    await this.ormRepository.save(driver);

    return driver;
  }
}

export default DriversRepository;
